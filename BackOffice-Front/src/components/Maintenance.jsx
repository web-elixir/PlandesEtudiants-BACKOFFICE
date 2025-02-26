import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
  Switch,
  FormControlLabel,
  List,
  ListItem,
  ListItemText,
  TablePagination,
  Box,
  Card,
  CardContent,
} from "@mui/material";
import { fetchMaintenance, createMaintenance } from "../../services/api";

const MaintenanceMode = () => {
  const [isMaintenance, setIsMaintenance] = useState(false);
  const [message, setMessage] = useState("");
  const [messageError, setMessageError] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [history, setHistory] = useState([]);
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    const loadMaintenanceData = async () => {
      const data = await fetchMaintenance();
      console.log("Données récupérées :", data);

      if (Array.isArray(data)) {
        const formattedData = data.map(item => ({
          message: item.Message,
          startTime: item.Begin,
          endTime: item.End,
        }));

        // Tri des données par date de début (le plus récent en premier)
        formattedData.sort((a, b) => new Date(b.startTime) - new Date(a.startTime));

        console.log("Historique mis à jour :", formattedData);
        setHistory(formattedData);
      } else {
        console.error("Format inattendu :", data);
      }
    };

    loadMaintenanceData();
  }, []);

  useEffect(() => {
    if (open) {
      setMessage("");
    }
  }, [open]);

  const handleToggle = async () => {
    if (!isMaintenance) {
      const start = new Date().toISOString();
      setStartTime(start);
      setOpen(true);
    } else {
      const end = new Date().toISOString();
      await createMaintenance(message, startTime, end);
      setEndTime(end);

      setHistory(prevHistory => [
        {
          message,
          startTime,
          endTime
        },
        ...prevHistory
      ]);
    }
    setIsMaintenance(!isMaintenance);
  };

  const handleSaveMessage = () => {
    if (message.trim() === "") {
      setMessageError(true);
      return;
    }
    setMessageError(false);
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
    if (isMaintenance) {
      setIsMaintenance(false);
      setEndTime(null);
    }
    setMessage("");
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Fonction de formatage de date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    });
  };

  return (
    <Box display="flex" mx="auto" mt={5} p={3} bgcolor="white" borderRadius={2} boxShadow={3} flexDirection="column" gap={4}>
      <Typography variant="h5">Gestion du mode maintenance</Typography>
      <FormControlLabel
        control={<Switch checked={isMaintenance} onChange={handleToggle} />}
        label={isMaintenance ? "Maintenance activée" : "Application active"}
      />

      {isMaintenance && (
        <Card sx={{ mt: 2, p: 2, bgcolor: "#ffebee" }}>
          <CardContent>
            <Typography variant="body1">Message de maintenance: {message || "Aucun message défini"}</Typography>
            <Typography variant="body2">Heure de début: {startTime ? formatDate(startTime) : "Non défini"}</Typography>
          </CardContent>
        </Card>
      )}

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Entrer un message de maintenance</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Message"
            fullWidth
            multiline
            rows={3}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            error={messageError}
            helperText={messageError ? "Le message est requis" : ""}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">Annuler</Button>
          <Button onClick={handleSaveMessage} color="secondary">Enregistrer</Button>
        </DialogActions>
      </Dialog>

      <Typography variant="h6">Historique des maintenances</Typography>
      <List sx={{ width: "100%", bgcolor: "background.paper", borderRadius: 2, boxShadow: 1 }}>
        {history.slice(page * rowsPerPage, (page + 1) * rowsPerPage).map((item, index) => (
          <ListItem key={index} divider>
            <ListItemText
              primary={`Message: ${item.message}`}
              secondary={`Début: ${formatDate(item.startTime)}, Fin: ${formatDate(item.endTime)}`}
            />
          </ListItem>
        ))}
        <TablePagination
          component="div"
          count={history.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </List>
    </Box>
  );
};

export default MaintenanceMode;

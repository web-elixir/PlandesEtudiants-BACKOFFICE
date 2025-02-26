import { useState, useEffect, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { Box, Button, Card, CardContent, List, ListItem, ListItemText, Typography, TextField, Autocomplete, TablePagination } from "@mui/material";
import { fetchPartners } from "../../services/api";

export default function PartnerQrCode() {
  const [partners, setPartners] = useState([]);
  const [selectedPartner, setSelectedPartner] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const qrCodeRef = useRef(null);
  const qrCodeDownloadRef = useRef(null);
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;

  useEffect(() => {
    const loadPartners = async () => {
      const data = await fetchPartners();
      setPartners(data);
    };
    loadPartners();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const downloadQRCode = () => {
    if (qrCodeDownloadRef.current) {
      const qrCodeUrl = qrCodeDownloadRef.current.toDataURL({
        width: 900,
        height: 900,
        type: "image/png",
      });
      const link = document.createElement("a");
      link.href = qrCodeUrl;
      link.download = `QR_Code_${selectedPartner.name}.png`;
      link.click();
    }
  };

  const filteredPartners = searchQuery.trim() === ""
    ? partners
    : partners.filter((partner) =>
        partner.name.toLowerCase().includes(searchQuery.toLowerCase())
      ).sort((a, b) => a.name.localeCompare(b.name));

  const displayedPartners = filteredPartners.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Box display={"flex"} mx="auto" mt={5} p={3} bgcolor="white" borderRadius={2} boxShadow={3} flexDirection={{ xs: "column", md: "row" }} gap={4}>
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        <Typography variant="h6" gutterBottom>
          Sélectionnez un partenaire
        </Typography>
        <Autocomplete
          disablePortal
          options={partners}
          getOptionLabel={(option) => option.name}
          onChange={(event, newValue) => setSelectedPartner(newValue)}
          onInputChange={(event, newValue) => setSearchQuery(newValue)}
          renderInput={(params) => <TextField {...params} label="Partenaire" />}
        />
        {displayedPartners.map((partner) => (
          <ListItem key={partner.id} divider>
            <ListItemText primary={partner.name} />
            <Button variant="contained" color="primary" onClick={() => setSelectedPartner(partner)}>
              Générer QR Code
            </Button>
          </ListItem>
        ))}
        <TablePagination
          component="div"
          count={partners.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[]}
        />
      </List>
      {selectedPartner && (
        <Card sx={{ mt: 4, alignItems: "center", textAlign: "center", p: 2, width: 300, alignContent: "center" }}>
          <CardContent>
            <QRCodeCanvas
              ref={qrCodeRef}
              value={`plandesetudiantsdebesancon://profil/loyalty/${selectedPartner.id}`}
              size={200}
              fgColor="#06d9d3"
              imageSettings={{
                src: "/Logo plan.png",
                height: 40,
                width: 40,
                excavate: false,
              }}
            />
            <Typography variant="body2" color="textSecondary" mt={2}>
              QR Code pour : <strong>{selectedPartner.name}</strong>
            </Typography>
            <Button
              variant="contained"
              color="success"
              sx={{ mt: 2 }}
              onClick={downloadQRCode}
            >
              Télécharger le QR Code
            </Button>
          </CardContent>
        </Card>
      )}
      <div style={{ display: "none" }}>
        <QRCodeCanvas
          ref={qrCodeDownloadRef}
          value={`plandesetudiantsdebesancon://profil/loyalty/${selectedPartner?.id}`}
          size={920}
          fgColor="#06d9d3"
          imageSettings={{
            src: "/Logo plan.png",
            height: 130,
            width: 130,
            excavate: false,
          }}
        />
      </div>
    </Box>
  );
}

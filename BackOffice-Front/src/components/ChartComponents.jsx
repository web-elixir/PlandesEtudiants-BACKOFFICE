import React, { useState, useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";
import { Line } from "react-chartjs-2";
import { MenuItem, Select, FormControl, InputLabel, Card, CardContent, Typography, Box, TextField } from "@mui/material";
import moment from "moment";

Chart.register(...registerables);

const UserRegistrationChart = () => {
  const [scale, setScale] = useState("yearly");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [chartData, setChartData] = useState(null);
  const chartRef = useRef(null);

  useEffect(() => {
    generateChartData();
  }, [scale, selectedDate]);

  const getWeeksInMonthISO8601 = (monthStartDate) => {
    const weeks = [];
    let startOfMonth = moment(monthStartDate).startOf("month");
    let endOfMonth = moment(monthStartDate).endOf("month");
  
    // Calcul de la première semaine ISO (commence toujours un lundi)
    let startOfWeek = startOfMonth.clone().startOf("isoWeek");
    
    while (startOfWeek.isBefore(endOfMonth, "day") || weeks.length < 5) { // Ajout de la condition pour 5 semaines
      let endOfWeek = startOfWeek.clone().endOf("isoWeek");
  
      // Si la semaine commence dans le mois précédent ou termine dans le mois suivant
      if (startOfWeek.month() !== startOfMonth.month()) startOfWeek = startOfMonth.clone().startOf("isoWeek");
      if (endOfWeek.month() !== endOfMonth.month()) endOfWeek = endOfMonth.clone().endOf("isoWeek");
  
      // Ajouter la semaine à la liste
      weeks.push({
        start: startOfWeek.clone(),
        end: endOfWeek.clone(),
      });
  
      startOfWeek.add(1, "week"); // Avancer d'une semaine
    }
  
    return weeks;
  };
  
  const generateChartData = () => {
    let labels = [];
    let data = [];
  
    if (scale === "yearly") {
      labels = ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil", "Août", "Sep", "Oct", "Nov", "Déc"];
      data = Array.from({ length: 12 }, () => Math.floor(Math.random() * 500));
    } else if (scale === "monthly") {
      const monthStartDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
      const weeksInMonth = getWeeksInMonthISO8601(monthStartDate);
  
      // Labels pour les semaines
      labels = weeksInMonth.map(week => {
        const startLabel = week.start.format("DD");
        const endLabel = week.end.format("DD");
  
        // Si la semaine commence et finit le même jour
        return startLabel === endLabel 
          ? startLabel
          : `Du ${startLabel} au ${endLabel}`;
      });
  
      // Données pour les semaines avec des données fictives
      data = weeksInMonth.map(() => {
        return Math.floor(Math.random() * 50); // Remplacer avec des données fictives pour chaque semaine
      });
    } else {
      labels = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
      data = Array.from({ length: 7 }, () => Math.floor(Math.random() * 50));
    }
  
    setChartData({
      labels,
      datasets: [
        {
          label: "Utilisateurs inscrits",
          data,
          borderColor: "rgb(75, 192, 192)",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          fill: true,
        },
      ],
    });
  };
  

  const handleYearChange = (e) => {
    setSelectedDate(new Date(e.target.value, selectedDate.getMonth()));
  };

  const handleMonthChange = (e) => {
    setSelectedDate(new Date(selectedDate.getFullYear(), e.target.value));
  };

  return (
    <Box display="flex" flexDirection={{ xs: "column", md: "row" }} gap={4}>
      <Card sx={{ flex: 1, textAlign: "center", alignContent: "center" }}>
        <CardContent>
          <Typography variant="h6" textAlign="center">Suivi</Typography>
          <ul>
            <li>Nombre d'utilisateurs actifs inscrits : <strong>150</strong></li>
            <li>Nombre de comptes créés : <strong>200</strong></li>
            <li>Nombre de récompenses distribuées : <strong>50</strong></li>
            <li>Nombre de codes scannés : <strong>300</strong></li>
          </ul>
        </CardContent>
      </Card>

      <Card sx={{ flex: 1 }}>
        <CardContent>
          <Typography variant="h6" textAlign="center">Utilisateurs inscrits</Typography>
          <FormControl fullWidth margin="normal">
            <InputLabel id="scale-label">Échelle</InputLabel>
            <Select labelId="scale-label" value={scale} onChange={(e) => setScale(e.target.value)}>
              <MenuItem value="yearly">Année</MenuItem>
              <MenuItem value="monthly">Mois</MenuItem>
              <MenuItem value="weekly">Semaine</MenuItem>
            </Select>
          </FormControl>

          {scale === "yearly" && (
            <FormControl fullWidth margin="normal">
              <InputLabel id="year-label">Année</InputLabel>
              <Select labelId="year-label" value={selectedDate.getFullYear()} onChange={handleYearChange}>
                {Array.from({ length: 10 }, (_, i) => 2021 + i).map((year) => (
                  <MenuItem key={year} value={year}>{year}</MenuItem>
                ))}
              </Select>
            </FormControl>
          )}

          {scale === "monthly" && (
            <FormControl fullWidth margin="normal">
              <InputLabel id="month-label">Mois</InputLabel>
              <Select labelId="month-label" value={selectedDate.getMonth()} onChange={handleMonthChange}>
                {Array.from({ length: 12 }, (_, i) => i).map((month) => (
                  <MenuItem key={month} value={month}>
                    {["Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil", "Août", "Sep", "Oct", "Nov", "Déc"][month]}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}

          {scale === "weekly" && (
            <TextField
              fullWidth
              margin="normal"
              label="Date"
              type="date"
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
              value={selectedDate.toISOString().split('T')[0]}
              onChange={(e) => setSelectedDate(new Date(e.target.value))}
            />
          )}

          {chartData && <Line ref={chartRef} data={chartData} options={{ responsive: true }} />}
        </CardContent>
      </Card>
    </Box>
  );
};

export default UserRegistrationChart;

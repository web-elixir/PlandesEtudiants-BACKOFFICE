import React, { useState, useEffect } from "react";
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Autocomplete, TextField, TablePagination } from "@mui/material";
import UserRewardsTable from "./UserRewardTable";
import { fetchRewards } from "../../services/api"; // Importation de la fonction fetchRewards

const RewardsPage = () => {
    const pageName = "Récompenses";

    const [searchQuery, setSearchQuery] = useState("");
    const [page, setPage] = useState(0);
    const [rewards, setRewards] = useState([]); // État pour stocker les récompenses

    const rowsPerPage = 10;

    // Récupération des récompenses depuis l'API
    useEffect(() => {
        const getRewards = async () => {
            const data = await fetchRewards();
            console.log("Données réellement stockées :", data);
            setRewards(Array.isArray(data) ? data : []);
        };
        getRewards();
    }, []);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    // Vérification que rewards est défini et filtrage par nom de partenaire
    const filteredData = rewards.length > 0 && searchQuery
        ? rewards.filter((reward) =>
            reward.partner?.name?.toLowerCase().includes(searchQuery.toLowerCase()) // Vérification safe
        )
        : rewards;

    const displayedData = filteredData.slice();

    const isRewardActive = (beginDate, endDate, expired) => {
        const currentDate = new Date();
        return !expired && new Date(beginDate) <= currentDate && new Date(endDate) >= currentDate;
    };

    return (
        <Box sx={{ mt: 10, width: "100%", px: 2 }} borderRadius={2} boxShadow={3} p={3}>
            <Typography variant="h4" gutterBottom>
                {pageName}
            </Typography>

            {/* Barre de recherche pleine largeur */}
            <Box sx={{ mb: 4, width: "100%" }}>
                <Autocomplete
                    disablePortal
                    options={rewards.map((reward) => reward.partner || { name: "Inconnu" })} // Évite une erreur si reward.partner est undefined
                    getOptionLabel={(option) => option.name || "Sans partenaire"} // Gestion du cas undefined
                    onChange={(event, newValue) => setSearchQuery(newValue ? newValue.name : "")} 
                    renderInput={(params) => (
                        <TextField {...params} label="Rechercher un partenaire" variant="outlined" fullWidth />
                    )}
                    sx={{ width: "100%" }}
                />
            </Box>

            {/* Tableau pleine largeur */}
            <TableContainer component={Paper} sx={{ width: "100%" }}>
                <Table id="dataTemplateRewards" sx={{ minWidth: 650 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Partenaire</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Durée</TableCell>
                            <TableCell>Récompenses restantes</TableCell>
                            <TableCell>Récompense attribuable ?</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {displayedData.length > 0 ? (
                            displayedData.map((reward, index) => (
                                <TableRow key={index}>
                                    <TableCell>{reward.partner?.name || "Sans partenaire"}</TableCell> 
                                    <TableCell>{reward.description || "Aucune description"}</TableCell>
                                    <TableCell>
                                        {new Date(reward.begin).toLocaleString()} au{" "}
                                        {new Date(reward.end).toLocaleString()}
                                    </TableCell>
                                    <TableCell>{reward.Number ?? "Non spécifié"}</TableCell>
                                    <TableCell
                                        sx={{
                                            backgroundColor: isRewardActive(reward.begin, reward.end, reward.expired)
                                                ? "green"
                                                : "red",
                                            color: isRewardActive(reward.begin, reward.end, reward.expired)
                                                ? "white"
                                                : "black",
                                        }}
                                    >
                                        {isRewardActive(reward.begin, reward.end, reward.expired) ? "oui" : "non"}
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={5} align="center">Aucune récompense disponible</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Pagination */}
            <TablePagination
                component="div"
                count={rewards.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                rowsPerPageOptions={[]}
            />
            <UserRewardsTable />
        </Box>
    );
};

export default RewardsPage;

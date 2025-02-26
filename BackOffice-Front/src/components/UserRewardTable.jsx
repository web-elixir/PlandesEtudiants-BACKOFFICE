import React, { useState } from "react";
import {
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Box,
    TablePagination,
} from "@mui/material";

const userRewards = [
    {
        user: { email: "user1@example.com" },
        partner: { name: "Partenaire A" },
        description: "Réduction 20%",
        beginDate: "2025-01-10T10:00:00",
        endDate: "2025-02-15T10:00:00",
        status: true,
    },
    {
        user: { email: "user2@example.com" },
        partner: { name: "Partenaire B" },
        description: "Offre spéciale",
        beginDate: "2025-02-01T08:30:00",
        endDate: "2025-03-10T18:00:00",
        status: false,
    },
    {
        user: { email: "user3@example.com" },
        partner: { name: "Partenaire C" },
        description: "Cadeau surprise",
        beginDate: "2025-03-05T12:00:00",
        endDate: "2025-04-20T23:59:59",
        status: true,
    },
];

const UserRewardsTable = () => {
    const [page, setPage] = useState(0);
    const rowsPerPage = 10;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    return (
        <Box sx={{ mt: 4, width: "100%" }}>
            <Typography variant="h5" gutterBottom>
                Récompenses des Utilisateurs
            </Typography>
            <TableContainer component={Paper} sx={{ width: "100%" }}>
                <Table id="dataRewards" sx={{ minWidth: 650 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Utilisateur</TableCell>
                            <TableCell>Partenaire</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Date de validité</TableCell>
                            <TableCell>Récompense valide ?</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {userRewards.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((reward, index) => (
                            <TableRow key={index}>
                                <TableCell>{reward.user.email}</TableCell>
                                <TableCell>{reward.partner.name}</TableCell>
                                <TableCell>{reward.description}</TableCell>
                                <TableCell>
                                    {new Date(reward.beginDate).toLocaleString()} au{" "}
                                    {new Date(reward.endDate).toLocaleString()}
                                </TableCell>
                                <TableCell
                                    sx={{
                                        backgroundColor: reward.status ? "green" : "orange",
                                        color: "white",
                                        textAlign: "center",
                                    }}
                                >
                                    {reward.status ? "Oui" : "Non"}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {/* Pagination */}
            <TablePagination
                component="div"
                count={userRewards.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                rowsPerPageOptions={[]} 
            />
        </Box>
    );
};

export default UserRewardsTable;
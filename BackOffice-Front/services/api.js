const API_URL = "http://localhost:1337/api";

const fetchRewards = async () => {
    try {
        const response = await fetch(`${API_URL}/rewards?populate=partner,user`);
        if (!response.ok) {
            throw new Error('Échec de la récupération des données');
        }
        const data = await response.json();
        
        console.log("Réponse API Strapi corrigée :", data);

        // Si `data` est directement un tableau, retourne-le tel quel
        return Array.isArray(data) ? data : [];
    } catch (error) {
        console.error("Erreur de récupération des récompenses :", error);
        return [];
    }
};

const fetchMaintenance = async () => {
    try {
        const response = await fetch(`${API_URL}/maintenances`);
        if (!response.ok) {
            throw new Error('Échec de la récupération des données');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        return undefined;
    }
};

const createMaintenance = async (message, startTime, endTime) => {
    const requestBody = {
        data: {
            Message: message,
            Begin: startTime,
            End: endTime,
            Status: false
        }
    };

    if (!message || !startTime || !endTime) {
        return null;
    }

    try {
        const response = await fetch(`${API_URL}/maintenances`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
            throw new Error("Erreur lors de la création de la maintenance");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        return null;
    }
};

const fetchPartners = async () => {
    try {
        const response = await fetch(`${API_URL}/partners?populate=*`);
        const data = await response.json();
                
        const partnersArray = Array.isArray(data) ? data : data.data;

        if (!partnersArray) {
            throw new Error("Structure de réponse inattendue");
        }

        return partnersArray.map(partner => ({
            id: partner.id,
            name: partner.name,
            phone: partner.phone,
            email: partner.email,
            description: partner.description,
            openHours: partner.openHours,
            image: partner.image,
            premium: partner.premium,
        }));
    } catch (error) {
        console.error("Erreur lors de la récupération des partenaires:", error);
        return [];
    }
};

const fetchUsersWithRewards = async () => {
    try {
        const response = await fetch(`${API_URL}/users?populate=rewards`);
        if (!response.ok) {
            throw new Error('Échec de la récupération des utilisateurs et de leurs récompenses');
        }
        const data = await response.json();
        console.log("Données des utilisateurs avec récompenses :", data);
        return data.data || [];
    } catch (error) {
        console.error("Erreur de récupération des utilisateurs et récompenses :", error);
        return [];
    }
};




export { fetchRewards, fetchMaintenance, createMaintenance, fetchPartners, fetchUsersWithRewards };
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import keycloak from './keycloak';
import './App.css';

function App() {
    const [authenticated, setAuthenticated] = useState(false);
    const [hasConsultRole, setHasConsultRole] = useState(false);
    const [personnes, setPersonnes] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [age, setAge] = useState('');
    const [address, setAdress] = useState('');
    const [idEdit, setIdEdit] = useState(null);

    const API_URL = 'http://localhost:8088/api/personner';

    useEffect(() => {
        if (!keycloak.token) {
            keycloak.init({ onLoad: 'login-required' }).then(auth => {
                setAuthenticated(auth);
                if (auth) {
                    const roles = keycloak.realmAccess?.roles || [];
                    setHasConsultRole(roles.includes("Role_Consultation"));
                    fetchPersonnes();
                }
            }).catch(console.error);
        } else {
            setAuthenticated(true);
            const roles = keycloak.realmAccess?.roles || [];
            setHasConsultRole(roles.includes("Role_Consultation"));
            fetchPersonnes();
        }
    }, []);

    const fetchPersonnes = () => {
        axios.get(API_URL, {
            headers: {
                Authorization: `Bearer ${keycloak.token}`
            }
        })
            .then(response => setPersonnes(response.data))
            .catch(error => console.error('Erreur lors du chargement des personnes :', error));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = { name, email, phone, age, address };

        const config = {
            headers: {
                Authorization: `Bearer ${keycloak.token}`
            }
        };

        if (idEdit === null) {
            axios.post(`${API_URL}/add`, data, config).then(() => {
                fetchPersonnes();
                resetForm();
            });
        } else {
            axios.put(`${API_URL}/edit/${idEdit}`, data, config).then(() => {
                fetchPersonnes();
                resetForm();
            });
        }
    };

    const handleEdit = (personne) => {
        setName(personne.name);
        setEmail(personne.email);
        setPhone(personne.phone);
        setAge(personne.age);
        setAdress(personne.address);
        setIdEdit(personne.id);
    };

    const handleDelete = (id) => {
        axios.delete(`${API_URL}/delet/${id}`, {
            headers: {
                Authorization: `Bearer ${keycloak.token}`
            }
        }).then(() => fetchPersonnes());
    };

    const resetForm = () => {
        setName('');
        setEmail('');
        setPhone('');
        setAge('');
        setAdress('');
        setIdEdit(null);
    };

    if (!authenticated) return <div>Chargement de Keycloak...</div>;

    return (
        <div className="container">
            <h1>Bienvenue, {keycloak.tokenParsed?.preferred_username} </h1>
            <button onClick={() => keycloak.logout()}>Déconnexion</button>

            <div className="flex-container">
                {!hasConsultRole && (
                    <div className="left-panel">
                        <form onSubmit={handleSubmit}>
                            <input type="text" placeholder="Nom" value={name} onChange={(e) => setName(e.target.value)} required />
                            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                            <input type="text" placeholder="Téléphone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                            <input type="text" placeholder="Âge" value={age} onChange={(e) => setAge(e.target.value)} />
                            <input type="text" placeholder="Adresse" value={address} onChange={(e) => setAdress(e.target.value)} />
                            <button type="submit">{idEdit === null ? "Ajouter" : "Modifier"}</button>
                            {idEdit !== null && <button type="button" onClick={resetForm}>Annuler</button>}
                        </form>
                    </div>
                )}

                <div className="right-panel">
                    <table border="1" cellPadding="10" style={{ width: '100%' }}>
                        <thead>
                        <tr>
                            <th>Nom</th>
                            <th>Email</th>
                            <th>Téléphone</th>
                            <th>Âge</th>
                            <th>Adresse</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {personnes.map(p => (
                            <tr key={p.id}>
                                <td>{p.name}</td>
                                <td>{p.email}</td>
                                <td>{p.phone}</td>
                                <td>{p.age}</td>
                                <td>{p.address}</td>
                                <td>
                                    {!hasConsultRole && (
                                        <>
                                            <button onClick={() => handleEdit(p)}>Modifier</button>
                                            <button onClick={() => handleDelete(p.id)}>Supprimer</button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default App;

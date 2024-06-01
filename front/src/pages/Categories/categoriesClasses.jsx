import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import { Card } from '../../components'
import './CategoriesStyle.css'

const CategoriesPage = ({ categorie, image ,title }) => {
    const [prod, setProd] = useState(null);
    console.log('------------',categorie)
    
    useEffect(() => {
        const fetchCatgProd = () => {
            fetch(`http://127.0.0.1:8000/api/product/categorie/${categorie}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('La catégorie demandée n\'a pas été trouvée.');
                    }
                    return response.json();})
                .then(data => {
                    if (Array.isArray(data)) {
                        setProd(data);
                    } else {
                        console.error('Les données renvoyées ne sont pas un tableau valide:', data);
                    }
                })
                .catch(erreur => {
                    console.log('Erreur lors du chargement des données');
                });
        };

        fetchCatgProd(); // Appeler la fonction fetchCatgProd lors du montage du composant
    }, [categorie]);



    const pageStyle = {
        backgroundImage: `url(${image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: '100%',
        height: '15rem',
        position: 'relative', // Position relative pour que la superposition soit positionnée par rapport à ce conteneur
    };

    const overlayStyle = {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Noir avec une opacité de 0.5
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        textAlign: 'center',
    };

    const paragraphStyle = {
        fontFamily: 'Georgia, serif',
        color: 'white',
        padding: '10px',
        fontSize: '35px', // Taille de la police
        fontWeight: '800', // Poids de la police
        letterSpacing: '1px', // Espacement entre les lettres
        lineHeight: '10px', // Hauteur de ligne
    };


    return (
        <div>
            {prod ? (
                <div>
                    
                    <div style={pageStyle}>
                        <div style={overlayStyle}>
                            <p style={paragraphStyle} >{title}</p>
                        </div>
                    </div>
                    
                    {/* <img src={image} alt="" /> */}
                    <div className='body'>
                        {prod.map(product => (
                        <div className='prod'>
                            <Card key={product.id} product = {product} />
                        </div> 
                        ))}
                    </div>
                    
                </div>
            ) : (
                <div>
                    Chargement...
                </div>
            )}
        </div>
    );
};

export default CategoriesPage;

import React, {useState, useEffect, useContext} from 'react'
import { Link } from 'react-router-dom'
// import AuthContext from '../context/AuthContext'
import { Card , Footer} from '../../components'
import './BoutiqueStyle.css'
import { boutique_head } from './../../assets'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus } from '@fortawesome/free-solid-svg-icons'



const BoutiquePage = () => {
    const intialCategory = localStorage.getItem('selectedCategory') || '';
    const initialSort = localStorage.getItem('selectedSort') || '';
    let [products, setProd] = useState([])
    const [selectedCategory, setSelectedCategory] = useState(intialCategory);
    const [selectedSort , setSelectedSort] = useState(initialSort);


    const handel_filter = (category) => {
        setSelectedCategory(category);
        localStorage.setItem('selectedCategory',category)
    }
    
    const handleSort = (sortOption) => {
        setSelectedSort(sortOption);
        localStorage.setItem('selectedSort' , sortOption)
    }

    useEffect(()=> {
        getProducts();
    }, []) // Les crochets vides signifient que cette fonction d'effet ne dépend d'aucune valeur et est exécutée une seule fois
    
    const filterProductsByCategory = () => {
        

        if(selectedCategory == ''){
            return products;
        }else {
            return products.filter(product => product.category_name === selectedCategory)
        }
    }

    // const filteredProducts = filterProductsByCategory();


    const sortProducts = (filteredProducts) => {
        switch (selectedSort) {
            // [...products]: Cette partie de la ligne crée une copie superficielle du tableau products.
          case 'prix-bas':
            return [...filteredProducts].sort((a, b) => a.price - b.price);
            // méthode sort() trie les éléments du tableau en place et retourne le tableau trié. Elle prend une fonction de comparaison en argument, 
            // qui est utilisée pour comparer chaque élément du tableau. Dans notre cas, nous comparons les éléments a et b en fonction de leur propriété
            //  price. Cette fonction de comparaison prend deux paramètres, a et b, qui représentent deux éléments du tableau à comparer. En soustrayant 
            //  b.price de a.price, nous obtenons un résultat positif si a doit être placé avant b dans le tableau trié (car cela signifie que a.price est inférieur à b.price), 
            //  et un résultat négatif dans le cas contraire. Cela entraîne le tri des éléments du tableau par ordre croissant de prix.
            
             case 'prix-haut':
            return [...filteredProducts].sort((a, b) => b.price - a.price);
          case 'nom-a-z':
            return [...filteredProducts].sort((a, b) => a.name.localeCompare(b.name));
          case 'nom-z-a':
            return [...filteredProducts].sort((a, b) => b.name.localeCompare(a.name));
          case 'plus-recent':
            return [...filteredProducts].sort((a, b) => new Date(b.date_added) - new Date(a.date_added));
          default:
            return filteredProducts;
        }
      };


    let getProducts = async() =>{
        let response = await fetch('http://127.0.0.1:8000/api/catalog/', {
            method:'GET',
            headers:{
                'Content-Type':'application/json',
            }
        })
        let data = await response.json()
        if(response.status === 200){
            setProd(data)
            console.log(data)
        }else {
            <p>Procuts can't be loaded</p>
        }
    }
    
    const filteredProducts = filterProductsByCategory();
  
    const sortedAndFilteredProducts = sortProducts(filteredProducts);



    const pageStyle = {
        backgroundImage: `url(${boutique_head})`,
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
        // backgroundColor: 'rgba(0, 0, 0, 0.5)', // Noir avec une opacité de 0.5
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
        
        <div className='boutique'>
            <div style={pageStyle}>
                    <div style={overlayStyle}>
                        <p style={paragraphStyle}>BOUTIQUE</p>
                    </div> 
            </div>
            <div className="boutique_body">
                <div id='boutique_filter'>
                    <p>Filtrer par</p>
                        <hr />
                    <div className='categorie'>
                        <p>Categorie</p>
                        <button><FontAwesomeIcon icon={faMinus} /></button>
                    </div>
                    <button className={`btn_filter ${selectedCategory === '' ? 'selected':''}`} onClick={() => handel_filter('')}>Tout</button>
                         {/* En résumé, cette syntaxe permet d'ajouter la classe 'selected' à l'élément <button> lorsque selectedCategory est égal à 'yeux', */}   
                    
                    <button className={`btn_filter ${selectedCategory === 'yeux' ? 'selected' : ''}`} onClick={() => handel_filter('yeux')}>Yeux</button>
                    <button className={`btn_filter ${selectedCategory === 'visage' ? 'selected' : ''}`} onClick={() => handel_filter('visage')}>Visage</button>
                    <button className={`btn_filter ${selectedCategory === 'levres' ? 'selected' : ''}`} onClick={() => handel_filter('levres')}>Levre</button>
                    
                    <hr />
                </div>
                <div className='boutique_content'>
                <div class="tri-produits">
                    {/* <label for="choix-tri">Trier par :</label> */}
                    <select id="choix-tri" onChange={(e) => handleSort(e.target.value)}>
                        <option value="prix">Trier Par</option>
                        <option value="prix-bas">Prix (bas à élevé)</option>
                        <option value="prix-haut">Prix (élevé à bas)</option>
                        <option value="nom-a-z">Nom (A-Z)</option>
                        <option value="nom-z-a">Nom (Z-A)</option>
                        <option value="plus-recent">Plus Récent</option>
                    </select>
                </div>


                    <div className='gird_prod'>
                        {sortedAndFilteredProducts.length > 0 ? (
                            sortedAndFilteredProducts.map(product => (
                            <div className='prod' key={product.id}>
                                <Card product={product} />
                            </div> 
                            ))
                        ) : (
                            <p></p>
                        )}
                    </div>
                </div>           
                    
            </div>
            <Footer/>
            
           
        </div>
    )
}

export default BoutiquePage

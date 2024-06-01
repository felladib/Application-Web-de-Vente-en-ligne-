import React, {useState, useEffect, useContext} from 'react'
// import AuthContext from '../context/AuthContext'
import { Link } from 'react-router-dom'
import { Card ,Footer} from '../../components'
import './HomeStyle.css'
import {rougeALevres, yeux , levres , visage} from './../../assets'

const HomePage = () => {
    let [products, setProd] = useState([])
   
    useEffect(()=> {
        getProducts()
    }, [])
    

    let getProducts = async() =>{
        console.log('start')
        let response = await fetch('http://127.0.0.1:8000/api/catalog/', {
            method:'GET',
            headers:{
                'Content-Type':'application/json',
            }
        })
        let data = await response.json()
       
        if (response.status === 200) {
            setProd(data);
        } else {
            return <p>Les produits ne peuvent pas être chargés</p>;
        }
    }
    

    
    
    return (
        <div id='home'>

            <div id='home_header'>
                <p  style={{ fontFamily: 'Georgia, serif' }}><span>Brillance</span> métallique </p>
                <p className='p2'>Découvrez nos nouvelles palettes d'ombres à paupières au fini brillant, au toucher doux et léger et à la tenue de 10 heures.</p>
                <button><Link to="/boutique">Boutique</Link></button>
            </div>

            <div id='home_part1'>
               
                <div className='home_part1_head'>
                    <p className='home_part1_title1'>LES INCONTOURNABLES</p>
                    <p className='home_part1_title2' style={{ fontFamily: 'Georgia, serif' }}> Meilleures <span>ventes</span></p>
                </div>

                 <div className='home_part1_body'>
                    {products.slice(0, 5).map(prod => (
                        <div>
                            <Card key={prod.id} product = {prod} />
                        </div> 
                    ))}
                </div>
                <div className='button_part1'>
                    <button><Link to="/boutique">Boutique</Link></button>
                </div>

            </div>

            <div id='home_part2'>
                <div className='home_part2_plein'>
                    <p>CHAUDES ET ÉPICÉES</p>
                    <p className='home_part2_plein_title' style={{ fontFamily: 'Georgia, serif' }}>Les lèvres les plus <span style={{ fontFamily: 'Georgia, serif' }}> vibrantes </span> de la ville</p>
                    <p className='home_part2_plein_discription' > Découvrez notre collection de rouges à lèvres chauds et épicés, conçus pour ajouter une touche d'audace à votre look. Cliquez ici pour parcourir nos produits et trouver votre teinte parfaite.</p>
                    <div className='button_part2'>
                        <button><Link to="/levre">Boutique Lèvers</Link></button>
                    </div>
                </div>
                <div className='home_part2_vide'>
                    <div class="image-container">
                        <img src={rougeALevres} alt="" class="scrolling-image" />
                    </div>
                </div>
            </div>


            <div id='home_part3'>
           
                <div className='home_part1_head'>
                        <p className='home_part1_title1'>À NE PAS MANQUER</p>
                        <p className='home_part1_title2' style={{ fontFamily: 'Georgia, serif' }}>  <span>Tendance</span> actuelle</p>
                </div>

                <div className='home_part1_body'>
                    {products.slice(3, 8).map(prod => (
                        <div>
                            <Card key={prod.id} product = {prod} />
                        </div> 
                    ))}
                </div>
                
            </div> 

             <div id='home_part4'>
                <p style={{ fontFamily: 'Georgia, serif' }}>Découvrir <span> plus</span> </p>
                   
                <div className='home_part4_plein'>
                    
                    <div className='boutique_' >
                        
                        <Link to='/yeux' className="boutique-link"> 
                            <p> BOUTIQUE</p> 
                            <p>YEUX</p>
                        </Link>
                        <img src={yeux} alt="" />

                    </div>
                    <div className='boutique_' >
                       
                        <Link to='/visage'  className="boutique-link">
                            <p> BOUTIQUE</p> 
                            <p>VISAGE</p>
                        </Link>
                        <img src={visage} alt="" />
                    </div>
                    <div className='boutique_' >
                        <Link to='/levre'  className="boutique-link">
                             <p >BOUTIQUE</p> 
                             <p >LÈVRES</p>
                        </Link>
                        <img src={levres} alt="" />
                    
                    </div>
                </div>

                <div className='home_part4_vide'>
                    
                </div>

            </div>  

            {/* <div id='home_part4'> */}
            {/* <h1>eeeeeeeeeeeeeh</h1> */}

            {/* </div> */}

            {/* <div id='home_part4'> */}
            {/* <h1>eeeeeeeeeeeeeh</h1> */}

            {/* </div> */}


            <Footer/>


            
            {/* <p>You are logged to the home page!</p> */}

            
        </div>
    )
}

export default HomePage

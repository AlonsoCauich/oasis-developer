import logo from './logo.svg';
import './App.css';

import React, { useEffect, useState } from 'react';
import moment from 'moment';
import 'moment/locale/es';

function App() {
  const urlRestaurant = 'http://demochallenge.xyz/api/1/2';
  const urlBares = 'http://demochallenge.xyz/api/1/3';
  const urlCenter = 'http://demochallenge.xyz/api/';

  const [places, setPlaces] = useState(null);
  const [bares, setBares] = useState(null);
  const [specifics, setSpecifics] = useState(null);

  const current = new Date();
  const currentDay = current.getDay();

  const fetchApiOne = async () => {
    const response = await fetch(urlRestaurant)
    /* console.log(response.status) */
    const responseJSON = await response.json()
    setPlaces(responseJSON.centros_consumo)
    /* console.log(responseJSON.centros_consumo) */
  }
  const fetchApiTwo = async () => {
    const response = await fetch(urlBares)
    /* console.log(response.status) */
    const responseJSON = await response.json()
    setBares(responseJSON.centros_consumo)
    /* console.log(responseJSON.centros_consumo) */
  }
  const handleData = async (e) => {
    const cat = e.target.getAttribute('data-id');
    const response = await fetch(urlCenter+cat)
    const responseJSON = await response.json()
    setSpecifics(responseJSON)
    /* console.log(responseJSON) */
  }

    useEffect(() => {
      fetchApiOne();
      fetchApiTwo();    
    }, []);
   


  return (
    <div>
      <nav className="navbar navbar-light bg-oasis" >
        <a className="navbar-brand text-white font-weight-bold">GRAND OASIS CANCUN         
        <span className="navbar-text ml-3 text-white font-weight-light border-left border-white pl-3">
          {moment().format('hh:mm A')}
        </span>
        <span className="navbar-text ml-3 text-white font-weight-light text-uppercase">
        {moment().locale('es').format('LL')}
        </span>
        </a>        
        <div className="form-inline">
          <img src="/logooasis.png" width="30" height="30" alt=""/>
        </div>
      </nav>
      
        <div className="row">
          <div className="col-sm px-md-5">
            <a href={void(0)} className="bg-transparent text-dark font-weight-bold text-center list-group-item list-group-item-action justify-content-between align-items-center border-top-0 border-left-0 border-right-0 border-dark">
            RESTAURANTES  
            </a>
            {   !places ? null : 
                places.map( (place, index) => {
                    return <a key={index} href={void(0)} className="list-group-item-light bg-transparent list-group-item list-group-item-action d-flex justify-content-between align-items-center border-top-0 border-left-0 border-right-0 border-dark">
                                <div className="flex-column">
                                    <h6 className="text-dark font-weight-bold">{place.nombre}</h6>
                                    {!place.concepto_es ? <br/> : 
                                        <p className="text-danger">
                                            {place.concepto_es}
                                        </p> 
                                    }                                       
                                    <span className="text-dark font-weight-bold mt-2" >ABIERTO HOY</span>                                    
                                    {place.horarios.map((horario, index) => {
                                        if(horario.dia == currentDay) {
                                            return <p className="text-dark" key={index}>{moment(horario.hora_inicio, 'hh:mm').format('hh:mm A')} - {moment(horario.hora_final, 'hh:mm').format('hh:mm A')}</p>;
                                        }
                                    })}
                                </div>
                                <div className="image-parent align-self-end mb-3">
                                    <button data-id={place.id} onClick={handleData} type="button" className="btn btn-outline-dark">VER MÁS</button>
                                </div>
                            </a>
                })
            }
          </div>
          <div className="col-sm bg-dark px-md-5">
            <a href={void(0)} className="bg-transparent text-white font-weight-bold text-center list-group-item list-group-item-action justify-content-between align-items-center border-top-0 border-left-0 border-right-0 border-white">
            BARES  
            </a>
            {   !bares ? null : 
                bares.map( (bar, index) => {
                  return <a key={index} href={void(0)} className="list-group-item-light bg-transparent list-group-item list-group-item-action d-flex justify-content-between align-items-center border-top-0 border-left-0 border-right-0 border-white">
                              <div className="flex-column">
                                  <h6 className="text-white font-weight-bold mb-4">{bar.nombre}</h6>                                  
                                  <span className="text-white font-weight-bold mt-2" >ABIERTO HOY</span>                                    
                                  {bar.horarios.map((horario, index) => {
                                      if(horario.dia == currentDay) {
                                          return <p className="text-white" key={index}>{moment(horario.hora_inicio, 'hh:mm').format('hh:mm A')} - {moment(horario.hora_final, 'hh:mm').format('hh:mm A')}</p>;
                                      }
                                  })}
                              </div>
                              <div className="image-parent align-self-end mb-3">
                                  <button data-id={bar.id} onClick={handleData} type="button" className="btn btn-outline-light">VER MÁS</button>
                              </div>
                          </a>
                })
            }
          </div>
          <div className="col-sm">
            
            {   !specifics ? null : 
                <div className='row'>
                  <div className='col-12'>
                    <div className="row justify-content-center align-items-center">
                      <h6 className="text-danger font-weight-bold pt-3">{specifics[0].nombre}</h6><br/>
                    </div>
                    <div className="d-flex justify-content-center align-items-center mt-2">
                        <img src={specifics[0].img_portada} className='text-center' width="50%" height="50%" alt=""/>
                    </div>
                  </div>
                  <div className='col-12'>
                    <div className="d-flex d-flex justify-content-center align-items-center mt-4">
                      <div className="stats pr-2">
                        <h6 className="mb-0">{specifics[0].nombre}</h6>
                        <p> 
                         {specifics[0].concepto_es}                          
                        </p>
                      </div>
                      <div className="stats border-left pl-2 ">
                        <h6 className="mb-0">ABIERTO HOY</h6>
                        {specifics[0].horarios.map((horario, index) => {
                            if(horario.dia == currentDay) {
                                return <p className="text-dark" key={index}>{moment(horario.hora_inicio, 'hh:mm').format('hh:mm A')} - {moment(horario.hora_final, 'hh:mm').format('hh:mm A')} 
                                &nbsp;</p>;
                            }
                        })}
                      </div>                  
                    </div>
                  </div>
                </div>
            }          
          </div>
        </div>
      
    </div>
  );
}

export default App;

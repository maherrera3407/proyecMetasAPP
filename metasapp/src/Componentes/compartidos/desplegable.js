import estilos from './desplegable.module.css';
import Vinculo from './Vinculo';
import { ReactComponent as ListaSVG }from '../img/lista.svg';
import { ReactComponent as NuevaSVG } from '../img/nueva.svg';


function Desplegable(){
    return(
    
     <div className={estilos.aside}>
    <Vinculo 
    to='/lista' 
    texto="Lista de metas"
    Icono={ListaSVG}/>
    <Vinculo 
    to='/crear'  
    texto="Nueva meta"
    Icono={NuevaSVG}/>
    </div>

  )
}
export default Desplegable;
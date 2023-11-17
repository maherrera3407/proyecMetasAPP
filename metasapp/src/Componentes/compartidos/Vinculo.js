import estilos from './Vinculo.module.css';
import {Link} from 'react-router-dom';
function Vinculo({Icono,texto,to}){
    return(
      <Link to={to} className={estilos.vinculo}>
          <Icono className={estilos.icono}/>
          {texto && <span className={estilos.texto}>{texto}</span>}
       </Link>
    );
}

export default Vinculo;
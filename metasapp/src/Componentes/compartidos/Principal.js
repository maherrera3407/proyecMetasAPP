import estilos from'./Principal.module.css'

function Principal({children}) {
    return (
      <div className={estilos.Principal}>
     
      <main className={estilos.main + " nm-convex-gray-100"} >
        {children}
      </main>
        
      </div>
    );
  }
  
  export default Principal;
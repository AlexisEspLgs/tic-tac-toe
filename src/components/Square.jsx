export const Square = ({ children, isSelected, updateBoard, index }) => {
    // Define la clase CSS basada en si el cuadrado está seleccionado
    const className = `square ${isSelected ? 'is-selected' : ''}`
  
    // Maneja el clic en el cuadrado
    const handleClick = () => {
      updateBoard(index) // Llama a la función updateBoard con el índice del cuadrado
    }
  
    return (
      <div onClick={handleClick} className={className}>
        {children}
      </div>
       // el children Muestra el contenido del cuadrado (X, O o vacío)
    )
  }
const  getLibrosxId=(id)=>{
    return fetch(`http://localhost:3000/libros/${id}`)
        .then ((response)=> response.json()
        
    )
        
}; export default getLibrosxId
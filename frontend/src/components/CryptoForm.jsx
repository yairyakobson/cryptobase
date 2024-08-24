const CryptoForm = ({
  handleIdChange,
  handleInputChange,
  handleSymbolChange,
  validateImage
}) =>{
  return(
    <>
      <section className="mb-4">
        <label className="block mb-2">ID</label>
        <input className="w-full p-2 border rounded-lg"
        type="text"
        name="id"
        onChange={handleIdChange}
        required/>
      </section>

      <section className="mb-4">
        <label className="block mb-2">Name</label>
        <input className="w-full p-2 border rounded-lg"
        type="text"
        name="name"
        onChange={handleInputChange}
        required/>
      </section>
      
      <section className="mb-4">
        <label className="block mb-2">Symbol</label>
        <input className="w-full p-2 border rounded-lg"
        type="text"
        name="symbol"
        onChange={handleSymbolChange}
        required/>
      </section>

      <section className="mb-4">
        <label className="block mb-2">Description</label>
        <textarea className="w-full p-2 border rounded-lg"
        rows="2"
        type="text"
        name="description"
        onChange={handleInputChange}
        required/>
      </section>

      <section>
        <label className="block mb-2">Logo</label>
        <input type="file"
        className="file-input-small file-input-bordered w-full max-w-xs"
        onChange={validateImage}/>
      </section>
    </>
  )
}

export default CryptoForm;
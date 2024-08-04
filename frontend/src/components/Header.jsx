import { Link } from "react-router-dom";

const Header = () =>{
  return(
    <div className="navbar bg-base-100 bg-yellow-500">
      <div className="flex-1">
        <Link to="/" className="text-xl">
        <h1 className="pl-2 mb-1 text-4xl font-bold
        sm:text-xl">Cryptobase</h1>
        </Link>
      </div>
    <div className="flex-none">
      <ul className="menu menu-horizontal px-1 mt-1">
      <Link to="/add-crypto"
      className="btn btn-ghost text-[1.2rem]
      sm:text-sm sm:mt-[0.3rem]
      md:text-[1.2rem] md:mt-[0.3rem]">Add New Currency</Link>
      </ul>
  </div>
</div>
  )
}

export default Header;
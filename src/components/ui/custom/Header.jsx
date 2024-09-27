import { Button } from "../button";
import './Header.css';

function Header() {
  return (
    <>
      <div className='flex justify-between items-center p-4 shadow-sm'>
        <img className="ml-2" src="/ex.png" width="100px" height="100px" alt="Logo" />
        <div className="mr-4">
          <Button> Sign In </Button>
        </div>
      </div>
      <hr />
    </>
  );
}

export default Header;

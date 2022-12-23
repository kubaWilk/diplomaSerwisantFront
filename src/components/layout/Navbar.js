import PropTypes from "prop-types";

const Navbar = ({ logo }) => {
  return (
    <div className="flex min-h-[70px] w-full items-center justify-center border-b border-gray-400">
      <div className="">
        <h1 className="font-bold text-4xl m-1">{logo}</h1>
      </div>
    </div>
  );
};

Navbar.propTypes = {
  logo: PropTypes.string.isRequired,
};

Navbar.defaultProps = {
  logo: "SerwisantPC",
};

export default Navbar;

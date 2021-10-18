import "./Loader.scss";
import loader from "../../assets/img/loading-buffering.gif";

const Loader = (props) => {
  return (
    <>
      <div className="loader w-100">
        <img
          src={loader}
          width={props.width}
          height={props.height}
          alt="loading..."
        />
      </div>
    </>
  );
};

export default Loader;

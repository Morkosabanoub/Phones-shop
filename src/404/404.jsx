import { NavLink } from "react-router-dom";
import img404 from '../assets/images/404.jpg'
import useChngtext from "../hooks/UseChngtext";
import './404.scss'

export default function PageNotFound() {
      const { text } = useChngtext();
    
    return (
      <div className="PageNotFound">
        <div className="PageNotFound-img">
          <img src={img404} alt="404" />
        </div>
        <div className="PageNotFound-text">
          <h1>{text.PageNotFoundtext}</h1>
          <button className="button-web">
            <NavLink to={"/"}>{text.PageNotFoundbut}</NavLink>
          </button>
        </div>
      </div>
    );
}

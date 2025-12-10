import "./featured.css";
import {useFetch} from "../../hooks/useFetch.js"

const Featured = () => {

  const { data, loading, error } = useFetch("/hotels/countByCity?cities=Jakarta,Semarang,Palembang")
  // console.log(data)

  return (
    <div className="featured">{
      loading ? 'Loading please wait' : <>
        <div className="featuredItem">
          <img
            src="https://images.unsplash.com/photo-1617687611017-48db8d42fd8f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
            className="featuredImg"
          />
          <div className="featuredTitles">
            <h1>Jakarta</h1>
            <h2>{data[0]} properties</h2>
          </div>
        </div>
      
        <div className="featuredItem">
          <img
            src="https://cf.bstatic.com/xdata/images/city/max500/690334.webp?k=b99df435f06a15a1568ddd5f55d239507c0156985577681ab91274f917af6dbb&o="
            alt=""
            className="featuredImg"
          />
          <div className="featuredTitles">
            <h1>Semarang</h1>
            <h2>{data[1]} properties</h2>
          </div>
        </div>
        <div className="featuredItem">
          <img
            src="https://cf.bstatic.com/xdata/images/city/max500/689422.webp?k=2595c93e7e067b9ba95f90713f80ba6e5fa88a66e6e55600bd27a5128808fdf2&o="
            alt=""
            className="featuredImg"
          />
          <div className="featuredTitles">
            <h1>Palembang</h1>
            <h2>{data[2]} properties</h2>
          </div>
        </div>
      </>
    }
      
    </div>
  );
};

export default Featured;

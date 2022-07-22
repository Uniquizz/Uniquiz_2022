import React, { useEffect, useState } from "react";
import "./Blog.css";


const urlimg = "https://blog.uniquiz.com.mx/wp-json/wp/v2/media/";
const lastPosts =
  "https://blog.uniquiz.com.mx/wp-json/wp/v2/posts/?_orderby&_embed=true";
const popularPosts =
  "https://blog.uniquiz.com.mx/wp-json/wordpress-popular-posts/v1/popular-posts/?_embed=true";

function App() {
  const [blog, setBlog] = useState(null);
  const [popularBlog, setPopularBlog] = useState(null);
  const [urlImg1, setUrlImg1] = useState();
  const [urlImg2, setUrlImg2] = useState();
  const [urlImg3, setUrlImg3] = useState();
  const [loading, setLoanding] = useState(true);

  console.log(blog);
  useEffect(() => {
    fetch(lastPosts)
      .then((res) => res.json())
      .then((data) => {
        const blogData = data;
        setBlog(blogData);
      });

    fetch(popularPosts)
      .then((res) => res.json())
      .then((data) => {
        const popularBlogData = data;
        setPopularBlog(popularBlogData[0]);
      });
  }, []);

  useEffect(() => {
    if (blog) {
      fetch(urlimg + blog[blog.length - 2].featured_media)
        .then((res) => res.json())
        .then((data) => {
          setUrlImg1(data.source_url);

        });
      fetch(urlimg + blog[blog.length - 1].featured_media)
        .then((res) => res.json())
        .then((data) => {
          setUrlImg2(data.source_url);
          setLoanding(false);
        });

    }
  }, [blog]);

  useEffect(() => {
    if (popularBlog) {
      fetch(urlimg + popularBlog.featured_media)
        .then((res) => res.json())
        .then((data) => {
          setUrlImg3(data.source_url);
        });
    }
  }, [popularBlog]);
  // Parrafo blog1
  function paragraph(id) {
    return { __html: blog[blog.length - id].excerpt.rendered };
  }

  function paragraphPopular() {
    return { __html: popularBlog.excerpt.rendered };
  }

  return (
    <div className="App">
      {loading ? (
        "Cargando..."
      ) : (
        <div className="sec4container">

         
          <div className="cardbg">
            <div className="cardbg2">
           

<div className="imgcontainer">
<img className="img-blog" src={urlImg1} alt="img-blog"></img>

</div>

<h3 className="h3Blog">{blog[blog.length - 2].title.rendered}</h3>
           

            <p dangerouslySetInnerHTML={paragraph(2)} />

            <a className="linkBlog" href={blog[blog.length - 2].link}>  Más...</a>

            </div>

          </div>



          <div className="cardbg">
            <div className="cardbg2">

           

<div className="imgcontainer">
<img className="img-blog" src={urlImg2} alt="img-blog"></img>

</div>
<h3 className="h3Blog">{blog[blog.length - 1].title.rendered}</h3>



<p dangerouslySetInnerHTML={paragraph(1)} />

<a className="linkBlog" href={blog[blog.length - 1].link}>Más...</a>

            </div>
   
          </div>
         
          <div className="cardbg">
            <div className="cardbg2">
            

<div className="imgcontainer">
  
<img className="img-blog" src={urlImg3} alt="img-blog"></img>

</div>
<h3 className="h3Blog">{popularBlog.title.rendered}</h3>


<p dangerouslySetInnerHTML={paragraphPopular()} />

<a className="linkBlog" href={popularBlog.link}>Más...</a>

            </div>

          </div>


         
    
        </div>
      )}
    </div>
  );
}

export default App;

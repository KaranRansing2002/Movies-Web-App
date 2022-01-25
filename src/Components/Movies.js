import React, { Component } from 'react'
import { movies } from './getMovies';
// import { movies } from './getMovies'
const axios=require('axios')

export default class Movies extends Component {
    constructor(){
        super();
        this.state={
            hover : '',
            parr : [1],
            currPage : 1,
            movies : [],
            favourites : []
        }
    }
    async componentDidMount(){
        const res=await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=af9e75cb11d498bbb31a394c12787975&language=on-US&page=${this.state.currPage}`)
        console.log(res.data);
        let data=res.data;
        this.setState({
            movies : [...data.results],
        })
    }
    changeMovies=async()=>{
        console.log("changeMovies called",this.state.currPage)
        const res=await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=af9e75cb11d498bbb31a394c12787975&language=on-US&page=${this.state.currPage}`)
        let data=res.data;
        console.log("second",data);
        this.setState({
            movies : [...data.results],
        })
    }
    handleRight=()=>{
        let temp=[];
        for(let i=1;i<=this.state.parr.length+1;i++){
            temp.push(i)
        }
        this.setState({
            parr : [...temp],
            currPage : this.state.currPage+1
        },this.changeMovies)
    }
    handleLeft=()=>{
        if(this.state.currPage===1){
            alert("cannot be done we already are on the first page");
        }
        else{
            let temp=[];
            for(let i=1;i<=this.state.parr.length-1;i++){
                temp.push(i)
            }
            this.setState({
                parr : [...temp],
                currPage : this.state.currPage-1
            },this.changeMovies)
        }
    }
    handleClick=(value)=>{
        if(this.state.currPage!=value){
            this.setState({
                currPage : value
            },this.changeMovies)
        }
    }
    handleFavourites=(movie)=>{
        console.log(movie);
        let oldData=JSON.parse(localStorage.getItem('movies') || '[]')
        if(this.state.favourites.includes(movie.id)){
            oldData=oldData.filter((m)=>m.id!=movie.id)
        }else{
            oldData.push(movie);
        }
        localStorage.setItem('movies',JSON.stringify(oldData))
        console.log(oldData);
        this.handleFavouritesStates();
    }
    handleFavouritesStates=()=>{
        let oldData=JSON.parse(localStorage.getItem('movies') || '[]')
        let temp=oldData.map((movie)=>movie.id);
        this.setState({
            favourites : [...temp]
        })
        
    }
    render() {
        //let movie=this.state.movies
        return (
            <>
            {
                this.state.movies.length==0 ? <div className="spinner-border text-dark" style={{display : 'flex',justifyContent : 'center'}} role="status">
                <span className="visually-hidden">Loading...</span>
                </div> : 
                <div>
                    <h3 className="text-center" style={{backgroundColor : '#373b69',color  : 'white',marginBottom : '0rem',fontSize : '2rem'}}><strong>Trending</strong></h3>
                    <div className='movies-list'>
                        {
                            this.state.movies.map((movieObj)=>( 
                                <div className="card movies-card" onMouseEnter={()=>this.setState({hover : movieObj.id})} key={movieObj.id} onMouseLeave={()=>this.setState({hover : ''})}>
                                    <img src={`https://image.tmdb.org/t/p/w1280/${movieObj.backdrop_path}`} className="card-img-top movies-img" alt="..." />
                                    {/* <div className="card-body"> */}
                                        <h5 className="card-title movies-title">{movieObj.original_title}</h5>
                                        {/* <p className="card-text banner-text">{movieObj.production}</p> */}
                                        <div className='button-wrapper' style={{display : 'flex',width : '100%',justifyContent : 'center'}}>
                                        {
                                            this.state.hover==movieObj.id && 
                                            <a  className="btn btn-primary movies-button" onClick={()=>this.handleFavourites(movieObj)}>{this.state.favourites.includes(movieObj.id) ? "Remove from Favourites" : "Add toFavourites"}</a>
                                        }
                                        
                                        </div>
                                    {/* </div> */}
                                </div>
                            ))
                        }
                    </div>
                    <nav aria-label="Page navigation example" style={{background : '#22254b',display : 'flex',justifyContent : 'center'}}>
                        <ul className="pagination" >
                            <li className="page-item" key={this.state.currPage}><a className="page-link" onClick={this.handleLeft}>Previous</a></li>
                            {
                                this.state.parr.map((value)=>(
                                    <li className="page-item"><a className="page-link" onClick={()=>this.handleClick(value)}>{value}</a></li>
                                ))
                            }
                            {/* <li class="page-item"><a class="page-link" href="#">2</a></li>
                            <li class="page-item"><a class="page-link" href="#">3</a></li> */}
                            <li className="page-item"><a className="page-link" onClick={this.handleRight}>Next</a></li>
                        </ul>
                    </nav>
                </div>
            }
            </>
        )
    }
}


import React, { Component } from 'react'
import { movies } from './getMovies'

export default class Favourites extends Component {
    constructor(){
        super();
        this.state={
            genres : [],
            currGenre : 'All Genres',
            movies : [],
            currText : '',
            limit : 5,
            currPage : 1
        }
    }
    componentDidMount(){
        let genreids = {28:'Action',12:'Adventure',16:'Animation',35:'Comedy',80:'Crime',99:'Documentary',18:'Drama',10751:'Family',14:'Fantasy',36:'History',
                        27:'Horror',10402:'Music',9648:'Mystery',10749:'Romance',878:'Sci-Fi',10770:'TV',53:'Thriller',10752:'War',37:'Western'};
        let data=JSON.parse(localStorage.getItem('movies') || '[]')
        let temp=[]
        data.forEach((movieObj)=>{
            if(!temp.includes(genreids[movieObj.genre_ids[0]])){
                temp.push(genreids[movieObj.genre_ids[0]])
            }
        })
        temp.unshift('All Genres');
        this.setState({
            genres : [...temp],
            movies : [...data]
        })
    }
    handleGeneres=(genre)=>{
        this.setState({
            currGenre : genre
        })
    }
    sortPopularityAsec=()=>{
        let temp=this.state.movies;
        temp.sort(function(obj1,obj2){
            return obj2.popularity-obj1.popularity
        })
        this.setState({
            movies : [...temp]
        })
    }
    sortPopularityDesc=()=>{
        let temp=this.state.movies;
        temp.sort(function(obj1,obj2){
            return obj1.popularity-obj2.popularity
        })
        this.setState({
            movies : [...temp]
        })
    }
    sortRatingDesc=()=>{
        let temp=this.state.movies;
        temp.sort(function(obj1,obj2){
            return obj2.vote_average-obj1.vote_average
        })
        this.setState({
            movies : [...temp]
        })
    }
    sortRatingAsec=()=>{
        let temp=this.state.movies;
        temp.sort(function(obj1,obj2){
            return obj1.vote_average-obj2.vote_average
        })
        this.setState({
            movies : [...temp]
        })
    }
    handlePageChange=(page)=>{
        this.setState({
            currPage : page
        })
    }
    handleDelete=(id)=>{
        let newArr=[];
        newArr=this.state.movies.filter((movieObj)=>movieObj.id!=id)
        this.setState({
            movies : [...newArr]
        })
        localStorage.setItem("movies",JSON.stringify(newArr));
    }
    render() {
        let genreids = {28:'Action',12:'Adventure',16:'Animation',35:'Comedy',80:'Crime',99:'Documentary',18:'Drama',10751:'Family',14:'Fantasy',36:'History',
                        27:'Horror',10402:'Music',9648:'Mystery',10749:'Romance',878:'Sci-Fi',10770:'TV',53:'Thriller',10752:'War',37:'Western'};
        let filterArr=[];

        if(this.state.currText===''){
            filterArr=this.state.movies
        }
        else{
            filterArr=this.state.movies.filter((movieObj)=>{
                let title=movieObj.original_title.toLowerCase();
                return title.includes(this.state.currText.toLocaleLowerCase());
            })
        }
        if(this.state.currGenre!='All Genres'){
            filterArr=this.state.movies.filter((movieObj)=>genreids[movieObj.genre_ids[0]]==this.state.currGenre)
        }

        let pages=Math.ceil(filterArr.length/this.state.limit);
        let pageArr=[];
        for(let i=1;i<=pages;i++){
            pageArr.push(i);
        }
        let startIndex=(this.state.currPage-1)*this.state.limit
        let endIndex=startIndex+this.state.limit;
        filterArr=filterArr.slice(startIndex,endIndex);
        return (
            <div>
                <>
                    <div className='main'>
                        <div className='row'>
                            <div className='col-lg-3 col-sm-12'>
                            <ul className="list-group favourits-genere">
                                {
                                    this.state.genres.map((genre)=>(
                                        this.state.currGenre==genre ? 
                                        <li class='list-group-item' style={{color : 'white',background : '#3f51b5',fontWeight : 'bold'}}>{genre}</li> :
                                        <li class='list-group-item' onClick={()=>this.handleGeneres(genre)}>{genre}</li>
                                    ))
                                }
                            </ul>
                            </div>
                            <div className='col-lg-9 favourites-table col-sm-12'>
                                <div className='row'> 
                                    <input type='text' className='input-group-text col' placeholder='search' value={this.state.currText} onChange={(e)=>this.setState({currText : e.target.value})}/>
                                    <input type='number' className='input-group-text col' placeholder='row count' value={this.state.limit} onChange={(e)=>this.setState({limit : e.target.value})}/>
                                </div>
                                <div className='row'>
                                    <table className="table">
                                        <thead>
                                            <tr>
                                            <th scope="col"></th>   
                                            <th scope="col">Title</th>
                                            <th scope="col">Genere</th>
                                            <th scope="col" ><i class="fas fa-sort-up" onClick={this.sortPopularityAsec}></i>Popularity<i class="fas fa-sort-down" onClick={this.sortPopularityDesc}></i></th>
                                            <th scope="col" ><i class="fas fa-sort-up" onClick={this.sortRatingAsec}></i>Rating<i class="fas fa-sort-down" onClick={this.sortRatingDesc}></i></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                filterArr.map((movieObj)=>(
                                                    <tr>
                                                        <td><img src={`https://image.tmdb.org/t/p/w1280/${movieObj.backdrop_path}`} className="card-img-top favourites-img" alt="..." /></td>
                                                        <td>{movieObj.original_title}</td>
                                                        <td>{genreids[movieObj.genre_ids[0]]}</td>
                                                        <td>{movieObj.popularity}</td>
                                                        <td>{movieObj.vote_average}</td>
                                                        <td><button type="button" className="btn btn-danger" onClick={()=>this.handleDelete(movieObj.id)}>Delete</button></td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                </div>
                                <nav aria-label="Page navigation example">
                                    <ul className="pagination">
                                        {
                                            pageArr.map((page)=>(
                                                <li className="page-item"><a className="page-link" onClick={()=>this.handlePageChange(page)}>{page}</a></li>
                                            ))
                                        }
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </>
            </div>
        )
    }
}

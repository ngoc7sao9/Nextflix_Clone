// Api key :bec721bcb126b9938b6c2f7b39448c63

//path : https://api.themoviedb.org/3/movie/550?api_key=bec721bcb126b9938b6c2f7b39448c63
// https://image.tmdb.org/t/p/original/wwemzKWzjKYJFfCeiB57q3r4Bcm.png
const api_key='api_key=bec721bcb126b9938b6c2f7b39448c63';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL+ '/discover/movie?sort_by=popularity.desc&' +api_key;
const Trending_URL_week = BASE_URL +'/trending/tv/week?' +api_key;
const Trending_URL_day = BASE_URL +'/trending/tv/week?' +api_key;
const List_geners=BASE_URL+'/genre/movie/list?'+api_key;
const Tv_URL=BASE_URL+'/discover/tv?sort_by=popularity.desc&'+api_key;
const $=document.querySelector.bind(document);
const $$=document.querySelectorAll.bind(document);
const List_trending=$('.section-trending-list');
const Slide_item=$('.slider-item');
const genre_list=$('.geners_movie');
const Movie_Geners=$('.gener-tag-list');
const TV_section=$('.TV-show-list')
const PrevBtn=$('.prevbtn');
const NextBtn=$('.nextbtn');
const NumCur=$('.num-current');
const SearchBtn=$('.search-btn');
const Close_Modal=$('.close-js-btn');
const Search=$('.search-btn input');
const Login_btn=$('.login-btn');
const ModalTag=$('.modal');
const Header_navigate=$('.header-navigate-btn');
const Headeritem=$('.header-navigate');
console.log(Search)
// console.log(Bodytag)
let MaxPage=50;
let currentpage=1;
let IdCur=28;
let idxSlide=0;
let ValidHeight=(window.outerHeight*20)/100;
GetMovie();
GetTrending(Trending_URL_week,List_trending)
GetlistGenres(List_geners,genre_list);
GetTvShow(Tv_URL,TV_section)
ControlPage();
SearchTag();
SearchFeature();
Modal();
NavigateonMobile();
FormHandle();
FooterItem();
AnimateHeader();
function AnimateHeader(){
    
    // if(){

    // }
}

function Get(id){
    console.log(id)
    currentpage=1;
    NumCur.innerText=currentpage;
   Movie_Geners.classList.add('active');
    GetListMovieGenresBy(id)
}
// ${BASE_URL}/movie/${id}/videos?${api_key}

function GetListMovieGenresBy(id){
    ControlPage(GetListMovieGenresBy);
    IdCur=id;

    fetch(`${BASE_URL}/discover/movie?${api_key}&with_genres=${id}&page=${currentpage}`)
    .then(function(res){
        return res.json();
    })
    .then(function(items){
        
     let htmls= items.results.map(function(item){
           return `
           <div id="${item.id}" class="gener-tag-list-item moive-item col l-3 m-4 c-6"  >
                    <div class="gener-tag-list-item-img" style="background-image: url(https://image.tmdb.org/t/p/original${item.poster_path});">
                          <div class="gener-tag-list-item-action">
                          <i class="fas fa-play-circle"></i>
                    
                        </div>
                    
                    </div>
                    <div class="gener-tag-list-item-contend">
                        <div class="gener-tag-list-item-name">${item.original_title}</div>
                        <div class="gener-tag-list-item-ranking">
                            <div class="gener-tag-list-item-year">${item.release_date}</div>
                            <div class="gener-tag-list-item-number-ranking">
                                <i class="fas fa-heart"></i>
                                ${Math.floor(item.popularity)}
                            </div>

                            <div class="gener-tag-list-item-star-ranking">
                                <i class="fas fa-star" "></i>
                                ${item.vote_average}
                            </div>
                        </div>
                    </div>
                </div>
           
           `;
            

       })
       Movie_Geners.innerHTML=htmls.join('');
    })

}

function GetTrending(URL,path){
    // i.push(2);
    fetch(Trending_URL_week).then(function(res){
        return res.json();
    })
    .then(function(items){
        // Getslide(items)
        
        // let htmlSlide=item.results

        let htmls=items.results.slice(0,14).map(function(item,idx){
            return `
            <li id="${item.id}" class="section-trending-item moive-item col l-2 m-3 c-6" >
             <div class="section-trending-img" style="background-image: url(https://image.tmdb.org/t/p/w500${item.poster_path});"></div>
             <div class="overview-contend">
             ${item.name}
             </br>${item.overview}</div>
            </li> 
            
            `
        })
        path.innerHTML=htmls.join('');
        // console.log($$('.moive-item'))
    })
   
}

function GetlistGenres(URL,path){
    fetch(URL).then(function(res){
        return res.json();
    })
    
    .then(function(items){
       items.genres.forEach(function(item){
        let htmls= `
            <div id="${item.id}" onclick="Get(this.getAttribute('id'))" class="gener-tag">${item.name}</div>
            
            `;
    
            path.insertAdjacentHTML("beforeend",htmls)
    
        })
        
   

            // document.querySelectorAll('.gener-tag');

    


    })

}

function GetTvShow(URL,path){
    fetch(URL).then(function(res){
        return res.json();
    })
    .then(function(items){
        items.results.forEach(function(item,idx){
            let html=`
            <div id="${item.id}" class="TV-show-item moive-item col l-2 m-3 c-6" >
                <div class="TV-show-item-action">
                       <i class="fas fa-play-circle"></i>
                </div>
                <div class="TV-show-item-img" style="background-image: url(https://image.tmdb.org/t/p/original${item.poster_path});"></div>
            </div>
            
            `;
            path.insertAdjacentHTML("beforeend",html)
        })
    })
}

function GetMovie(id){



    fetch(`${BASE_URL}/discover/movie?sort_by=popularity.desc&${api_key}&page=${currentpage}`).then(function(res){
        return res.json();
    })
    .then(function(items){
       let htmls= items.results.map(function(item){
           return `
           <div id="${item.id}" class="gener-tag-list-item moive-item col l-3 m-4 c-6">
                    <div class="gener-tag-list-item-img" style="background-image: url(https://image.tmdb.org/t/p/w500/${item.poster_path});">
                          <div class="gener-tag-list-item-action">
                          <i class="fas fa-play-circle"></i>
                    
                        </div>
                    
                    </div>
                    <div class="gener-tag-list-item-contend">
                        <div class="gener-tag-list-item-name">${item.original_title}</div>
                        <div class="gener-tag-list-item-ranking">
                            <div class="gener-tag-list-item-year">${item.release_date}</div>
                            <div class="gener-tag-list-item-number-ranking">
                                <i class="fas fa-heart"></i>
                                ${Math.floor(item.popularity)}
                            </div>

                            <div class="gener-tag-list-item-star-ranking">
                                <i class="fas fa-star" "></i>
                                ${item.vote_average}
                            </div>
                        </div>
                    </div>
                </div>
           
           `;
            

       })
       Movie_Geners.innerHTML=htmls.join('');
    })
}

function ControlPage(Callback){
    
    NextBtn.onclick=function(){
        // Movie_Geners.scrollIntoView({
        //     behavior:'smooth'
        // })
        if(currentpage<MaxPage) {
            currentpage++;
            NumCur.innerText=currentpage;
            Callback(IdCur);
        }else{
            currentpage=1;
            NumCur.innerText=currentpage;
            Callback(IdCur);

        }
         Movie_Geners.scrollIntoView({
            behavior:'smooth'
        })
    }

    PrevBtn.onclick=function(){
        if(currentpage>1) {
            currentpage--;
            NumCur.innerText=currentpage;
            Callback(IdCur);
        }else{
            currentpage=MaxPage;
            NumCur.innerText=currentpage;
            Callback(IdCur);

        }
        Movie_Geners.scrollIntoView({
            behavior:'smooth',
            block:"nearest"
        })
    }
}

function SearchTag(){

    //Xử lý sự kiện đóng mở thanh Search 
    SearchBtn.onclick=function(){
        $('.nav-left').classList.toggle('active')
        if($('.nav-left').classList.contains('active')){
            $('.nav-left input').focus();
        }else{
            $('.nav-left input').blur();

        }
    }

    // Xử lý sự kiện khi nhấn vào thanh search thì bị mất
    $('.nav-left input').onclick=function(e){
        e.stopPropagation();
    }

    //xử lý sự kiện khi focus ra ngoài thanh search 
    $('.nav-left input').onblur=function(){
        this.value='';
        $('.nav-left').classList.remove('active')
    }
}

function SearchKeyWord(string){
    fetch(string).then(function(res){
        return res.json();
    })
    .then(function(items){
        if(items.results.length==0){
            console.log(true)
        }else
        {
            let htmls= items.results.map(function(item){
                return `
                <div id="${item.id}" class="gener-tag-list-item moive-item col l-3 m-4 c-6">
                         <div class="gener-tag-list-item-img" style="background-image: url(https://image.tmdb.org/t/p/original${item.poster_path});">
                               <div class="gener-tag-list-item-action">
                               <i class="fas fa-play-circle"></i>
                         
                             </div>
                         
                         </div>
                         <div class="gener-tag-list-item-contend">
                             <div class="gener-tag-list-item-name">${item.original_title}</div>
                             <div class="gener-tag-list-item-ranking">
                                 <div class="gener-tag-list-item-year">${item.release_date}</div>
                                 <div class="gener-tag-list-item-number-ranking">
                                     <i class="fas fa-heart"></i>
                                     ${Math.floor(item.popularity)}
                                 </div>
     
                                 <div class="gener-tag-list-item-star-ranking">
                                     <i class="fas fa-star" "></i>
                                     ${item.vote_average}
                                 </div>
                             </div>
                         </div>
                     </div>
                
                `;
                 
     
            })
            Movie_Geners.innerHTML=htmls.join('');
        }



    })
}

// console.log($$('.moive-item'))
function SearchFeature(){
    let query,flag=0;
    Search.onchange=function(e){
        // console.log(e)
        query=e.target.value;
    }
    Search.onkeyup=function(e){
        // query=e.target.value;
        
        if(e.which==13) {
            if(this.value=='') {
                $('.nav-left').classList.remove('active');
                console.log(123);
            }
            else{
                this.value='';
    
                // khúc này để search xong thì kéo xuống ra vùng ra kết quả tìm kiếm
                Movie_Geners.scrollIntoView({
                    behavior:'smooth'
                })
                $('.nav-left').classList.remove('active');
                let SearchUrl=BASE_URL+`/search/movie?`+api_key+`&query=${query}`;
                SearchKeyWord(SearchUrl);
            }
        }

    }
   
}

function Modal(){
    Login_btn.onclick=function(){
        ModalTag.classList.toggle('open');
    }
  
    ModalTag.onclick=function(e){
        console.log(123)
        this.classList.remove('open');

    }
    $('.modal-resgister').onclick=function(e){
        e.stopPropagation();
    }

}


function NavigateonMobile(){
    Header_navigate.onclick=function(){
        Headeritem.classList.toggle('active');
    }
    $('.close-btn').onclick=function(){
        Headeritem.classList.remove('active');
    }
    let nav_item=$$('.nav-item');
    nav_item.forEach(function(item){
        item.onclick=function(){
            Headeritem.classList.remove('active');
        }
    })

    $$('.header-navigate a').forEach(function(item){
        item.onclick=function(e){
            if(item.href.endsWith('#')) 
                e.preventDefault();
        }
    })
}

function FormHandle(){
    /// Xử lý phan input modal
    let Email,Pass;
    $('.Email-input').onchange=function(e){
        Email=e.target.value;
    }

    $('.Pass-input').oninput=function(e){
        if($('.Email-input').value !="" && $('.Pass-input').value !="")
            $('.btn-submit').classList.add('active');
        else $('.btn-submit').classList.remove('active');
    }
    
    $('.btn-submit').onclick=function(e){
        if($('.Email-input').value !="" && $('.Pass-input').value !="")
            console.log(true);
        else e.preventDefault();
    }
}

function FooterItem(){
    $$('.footer-list .footer-item').forEach(function(item){
        item.onclick=function(e){
            if(e.target.href.endsWith('#')) 
                e.preventDefault();
        }
    })
}
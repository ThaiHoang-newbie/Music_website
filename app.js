
const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const songTitle = $('.music-play__info marquee')
const songSinger = $('.music-play__info .song-item--singer')
const menuSide = $('.menu-side')
const btnCloseMenuSide = $('.menu-side__logo i')
const btnOpenMenuSide = $('.mobile__heading--menu')
const menuSongPlaylist = $('.menu-side__song')
const menuSongPlaylistUSUK = $('.menu-side__song.us-uk')
const menuSongPlaylistEDM = $('.menu-side__song.edm')
const personalSongPlaylist = $('.personal__song--list')
const cdThumb = $('.music-play__image')
const noteMusicAnimate = $$('.box-note-icon i')
const audio = $('#audio')
const wave = $('.music-play__left .music-play__wave')
const timeEnd = $('.music-play__progress--end')
const timeStart = $('.music-play__progress--start')
const btnPlay = $('.music-play__control .btn-toggle-play .bi-play-circle')
const btnNext = $('.music-play__control .btn-next .bi-skip-forward')
const btnPrev = $('.music-play__control .btn-prev .bi-skip-backward')
const btnRepeat = $('.music-play__control .btn-repeat')
const btnRandom = $('.music-play__control .btn-random')
const progress = $('.music-play__progress--seek .progress')
const seekbar = $('.music-play__progress--seek .seek__bar')
const seekdot = $('.music-play__progress--seek .seek__dot')
const volume = $('.music-play__volume .volume')
const iconVolume = $('.music-play__volume i')
const seekbarVolume = $('.music-play__volume .seek__bar')
const seekdotVolume = $('.music-play__volume .seek__dot')
const btnPlayAll = $('.personal__title--right button')
const themeModal = $('.theme-modal__content')
const playlistPersonal = $('.container__personal--wrapper-item .song-side__playlist--carousel.playlist')
const albumPersonal = $('.container__personal--wrapper-item .song-side__playlist--carousel.album')
const mvPersonal = $('.song-side__playlist--carousel.mv')
const singerPersonal = $('.song-side__playlist--carousel.singer')
const video = $('.playlist__mv-item--video')
const chartLegendBox = $('.chart__legend-box')

const songSide = $('.song-side')
const bannerTitle = $('.song-side__banner--title')
const bannerContent = $('.song-side__banner--content')
const heading = $('.song-side__heading')
const tabs = $$('.song-side__heading--tabs .tab-item')
const songSideContainer = $$('.song-side__container')
const songSideContainerActive = $('.song-side__container.active')
const listSlide = $$('.song__animate-img--item')
const leftScrollPlaylist = $('#left-scroll-playlist')
const rightScrollPlaylist = $('#right-scroll-playlist')
const leftScrollSinger = $('#left-scroll-singer')
const rightScrollSinger = $('#right-scroll-singer')
const carouselPlaylist = $('.song-side__playlist .song-side__playlist--carousel')
const carouselSinger = $('.song-side__singer .song-side__playlist--carousel')
const carouselNewRelease = $('.swiper__new-release .swiper-wrapper')
const btnTheme = $('.song-side__heading--theme')
const modalTheme = $('.theme-modal')
const btnCloseTheme = $('.theme-modal__heading i')
const mainPage = $('header')
const leftScrollPlaylistPersonal = $('.playlist-personal .bi-arrow-left')
const rightScrollPlaylistPersonal = $('.playlist-personal .bi-arrow-right')
const leftScrollAlbumPersonal = $('.album-personal .bi-arrow-left')
const rightScrollAlbumPersonal = $('.album-personal .bi-arrow-right')
const leftScrollMVPersonal = $('.mv-personal .bi-arrow-left')
const rightScrollMVPersonal = $('.mv-personal .bi-arrow-right')
const leftScrollSingerPersonal = $('.singer-personal .bi-arrow-left')
const rightScrollSingerPersonal = $('.singer-personal .bi-arrow-right')
const searchContainer = $('.search__result');
const searchInput = $('#search-song');

const PLAYER_STORAGE_KEY = 'ZING_MP3_DEVELOPER'
const songAPI = 'https://615950a6601e6f0017e5a15b.mockapi.io/api/songs'
const singerAPI = 'https://615950a6601e6f0017e5a15b.mockapi.io/api/singers'
const playlistAPI = 'https://615950a6601e6f0017e5a15b.mockapi.io/api/playlist'
const videoAPI = 'https://615950a6601e6f0017e5a15b.mockapi.io/api/videos'
const songUSUKAPI = 'https://6260ea02f429c20deb979e8a.mockapi.io/USUK'
const songEDMAPI = 'https://6260ea02f429c20deb979e8a.mockapi.io/EDM'
const rankTableAPI = 'https://mp3.zing.vn/xhr/chart-realtime?songId=0&videoId=0&albumId=0&chart=song&time=-1'
var songData = []
var singerData = []
var playlistData = []
var videoData = []
var songDataUSUK = []
var songDataEDM = []
var rankTableData = []

getData = (api) =>{
    return new Promise((resolve, reject)=>{
        var request = new XMLHttpRequest()
        request.open('GET', api)
        request.onload = () =>{
            if(request.status == 200){
                resolve(request.response)
            }
            else{
                reject(Error(request.statusText))
            }
        }
        request.onerror = ()=>{
            return Error('Fetching Data Failed')
        }
        request.send()
    })
}

Promise.all([getData(songAPI), getData(singerAPI), getData(playlistAPI), getData(videoAPI), getData(songUSUKAPI), getData(songEDMAPI), getData(rankTableAPI)])
.then(([songs, singers, playlists, videos, songsUSUK, songsEDM, ranksTable]) =>{
    songData = JSON.parse(songs)
    singerData = JSON.parse(singers)
    playlistData = JSON.parse(playlists)
    videoData = JSON.parse(videos)
    songDataUSUK = JSON.parse(songsUSUK)
    songDataEDM = JSON.parse(songsEDM)
    rankTableData = JSON.parse(ranksTable)
})
.then(()=>app.start())
.then(()=>console.log(rankTableData.data.song.length))
.catch((err)=>alert(err))

const app = {
    currentIndex : 0,
    isPlaying: false,
    isRepeat: false,
    isRandom: false,
    isMute: false,
    isPlayPersonalSong: false,
    isPlayUSUK: false,
    isPlayEDM: false,
    configuration: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},
    cdThumbRotate: cdThumb.animate([
        { transform: 'rotate(360deg)'}
    ], {
        duration: 8000,
        iterations: Infinity
    }),
    swiperNewRelease: setTimeout(() => {
        new Swiper(".swiper__new-release", {
            slidesPerView: 3,
            spaceBetween: 30,
            slidesPerGroup: 3,
            loop: true,
            loopFillGroupWithBlank: true,
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
            breakpoints: {
                // when window width is >= 320px
                320: {
                  slidesPerView: 1,
                  spaceBetween: 10,
                  slidesPerGroup: 1,
                },
                740: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                  slidesPerGroup: 2
                },
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                    slidesPerGroup: 3
                },
              },
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },
            speed: 1000,
        })
    }, 3000),
    swiperBanner: new Swiper(".swiper__banner", {
        grabCursor: true,
        effect: "creative",
        creativeEffect: {
          prev: {
            shadow: true,
            translate: [0, 0, -400],
          },
          next: {
            translate: ["100%", 0, 0],
          },
        },
        loop: true,
        pagination: {
          el: '.swiper-pagination',
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
        speed: 1000,
    }),
    setConfiguration: (key, value)=>{
        app.configuration[key] = value
        localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(app.configuration))
    },
    loadConfiguration: ()=>{
        app.isRandom = app.configuration.isRandom
        app.isRepeat = app.configuration.isRepeat
        const colors = app.configuration.theme
        if(colors){
            document.documentElement.style.setProperty('--primary-bg', colors.primaryBg)
            document.documentElement.style.setProperty('--menu-side-bg', colors.menuSideBg)
            document.documentElement.style.setProperty('--music-play-bg', colors.musicPlayBg)
            document.documentElement.style.setProperty('--theme-modal-bg', colors.themeModalBg)
            document.documentElement.style.setProperty('--text-color', colors.textColor)
            document.documentElement.style.setProperty('--active-color', colors.activeColor)
            document.documentElement.style.setProperty('--none-active-color', colors.noneActiveColor)
            document.documentElement.style.setProperty('--border-layout', colors.borderLayout)
            document.documentElement.style.setProperty('--background-image', colors.backgroundImage)
            document.documentElement.style.setProperty('--sub-text-color', colors.subTextColor)
        }
    },
    defineProperties: () =>{
        Object.defineProperty(app, 'currentSong', {
            get: ()=>(songData[app.currentIndex])
        })
        Object.defineProperty(app, 'currentPlaylist', {
            get: ()=>(rankTableData.data.song[app.currentIndex])
        })
        Object.defineProperty(app, 'currentSongUSUK', {
            get: ()=>(songDataUSUK[app.currentIndex])
        })
        Object.defineProperty(app, 'currentSongEDM', {
            get: ()=>(songDataEDM[app.currentIndex])
        })
    },
    renderTheme: ()=>{
        const dataRender = themes.map((theme, index)=>{
            return `
                <div class="theme-modal__content--item" data-type="${index}">
                    <h3 class="content__item--title">${theme.type}</h3>
                    <div class="content__item--container">
                    ${theme.list.map((item, index)=>{
                        return `
                            <div class="content__item--theme" data-index="${index}">
                                <div class="item__theme--display">
                                    <img
                                        src="${item.thumbnail}"
                                        alt=""
                                    />
                                    <div class="item__theme--actions">
                                        <button class="item__theme--apply">Áp Dụng</button>
                                        <button class="item__theme--preview">Xem Trước</button>
                                    </div>
                                </div>
                                <h4>${item.name}</h4>
                            </div>`
                    })}
                    </div>
                </div>`
        })

        let htmls = ''
        Array.from(dataRender).forEach((item, index)=>{
            htmls = htmls.concat(item.replace(/,/g, ""))
        })
        themeModal.innerHTML = htmls
    },
    renderMenuSong: ()=>{
        
        const htmls = rankTableData.data.song.map((item, index)=>{
            return `
            <div class="menu-side__song-item ${app.currentIndex === index ? 'active' : ''}" data-index="${index}">
                <div class="menu-side__song-item--number">${item.order}</div>
                <div class="menu-side__song-item--image">
                    <div class="music-play__wave active">
                        <div class="music-play__wave-item"></div>
                        <div class="music-play__wave-item"></div>
                        <div class="music-play__wave-item"></div>
                    </div>
                    <img src=${item.thumbnail} />
                </div>
                <div class="menu-side__song-item--info">
                    <div class="song-item--title">${item.name}</div>
                    <div class="song-item--singer">${item.artists_names}</div>
                </div>
                <div class="menu-side__song-item--play">
                    <i class="bi bi-play-circle-fill"></i>
                </div>
            </div>`
        })
        menuSongPlaylist.innerHTML = htmls.join('')
    },
    renderMenuSongUSUK: () =>{
        const htmls = songDataUSUK.map((song, index)=>{
            return `
            <div class="menu-side__song-item ${app.currentIndex === index ? 'active' : ''}" data-index="${index}">
                <div class="menu-side__song-item--number">${song.id <= 9 ? '0' + song.id : song.id }</div>
                <div class="menu-side__song-item--image">
                    <div class="music-play__wave active">
                        <div class="music-play__wave-item"></div>
                        <div class="music-play__wave-item"></div>
                        <div class="music-play__wave-item"></div>
                    </div>
                    <img src=${song.thumbnail} />
                </div>
                <div class="menu-side__song-item--info">
                    <div class="song-item--title">${song.name}</div>
                    <div class="song-item--singer">${song.singer}</div>
                </div>
                <div class="menu-side__song-item--play">
                    <i class="bi bi-play-circle-fill"></i>
                </div>
            </div>`
        })
        menuSongPlaylistUSUK.innerHTML = htmls.join('')
    },
    renderMenuSongEDM: () =>{
        const htmls = songDataEDM.map((song, index)=>{
            return `
            <div class="menu-side__song-item ${app.currentIndex === index ? 'active' : ''}" data-index="${index}">
                <div class="menu-side__song-item--number">${song.id <= 9 ? '0' + song.id : song.id }</div>
                <div class="menu-side__song-item--image">
                    <div class="music-play__wave active">
                        <div class="music-play__wave-item"></div>
                        <div class="music-play__wave-item"></div>
                        <div class="music-play__wave-item"></div>
                    </div>
                    <img src=${song.thumbnail} />
                </div>
                <div class="menu-side__song-item--info">
                    <div class="song-item--title">${song.name}</div>
                    <div class="song-item--singer">${song.singer}</div>
                </div>
                <div class="menu-side__song-item--play">
                    <i class="bi bi-play-circle-fill"></i>
                </div>
            </div>`
        })
        menuSongPlaylistEDM.innerHTML = htmls.join('')
    },
    renderPersonalSong: ()=>{
        const personalSongList = $('.personal__song--list')
        const htmls = songData.map((song, index)=>{
            return `
                <div class="personal__song--list-item " data-index="${index}">
                  <div class="song__list-item--left">
                    <i class="bi bi-music-note-beamed"></i>
                    <div class="song__list-item--left-thumbnail">
                      <div class="music-play__wave active">
                        <div class="music-play__wave-item"></div>
                        <div class="music-play__wave-item"></div>
                        <div class="music-play__wave-item"></div>
                      </div>
                      <img src=${song.thumbnail} alt="#" />
                    </div>
                    <div class="list-item__left--card-info">
                      <span class="card-info__title">${song.name}</span>
                      <span class="card-info__subtitle">${song.singer}</span>
                    </div>
                  </div>
                  <div class="song__list-item--content">
                    <span>${song.album}</span>
                  </div>
                  <div class="song__list-item--right">
                    <span>04:50</span>
                  </div>
                </div>
            `
        })
        personalSongList.innerHTML = htmls.join('')   
    },
    renderCarouselPlaylist: ()=>{
        const htmls = songData.map((song, index)=>{
            return `
            <a href="." class="playlist__carousel-item" id=${index}>
                <div class="playlist__carousel-item--img">
                    <img src=${song.thumbnail} alt="#" />
                    <i class="bi bi-play-circle"></i>
                </div>
                <div class="playlist__carousel-item--title">
                    ${song.album}
                </div>
                <div class="playlist__carousel-item--subtitle">
                    ${song.singer}
                </div>
            </a>`
        })
        carouselPlaylist.innerHTML = htmls.join('')  
    },
    renderCarouselSinger: ()=>{
        const htmls = singerData.map((singer, index)=>{
            return `
            <a class="playlist__carousel-item--circle">
            <div class="carousel-item__circle--img">
              <img
                src=${singer.image}
                alt="#"
              />
              <i class="bi bi-play-circle"></i>
            </div>
            <div class="carousel-item__circle--name">${singer.name}</div>
          </a>
            `
        })
        carouselSinger.innerHTML = htmls.join('')
    },
    renderNewRelease: ()=>{
        const htmls = playlistData.slice().reverse().slice(1).map((item, index)=>{
            return `
            <div class="song-side__new-release--item swiper-slide">
                <div class="song-side__new-release--thumbnail">
                    <img src=${item.thumbnail}>
                    <i class="bi bi-play-circle"></i>
                </div>
                <div class="song-side__new-release--content">
                    <div class="new-release__info">
                        <div class="new-release__info--title">${item.name}</div>
                        <div class="new-release__info--subtitle">${item.singer}</div>
                    </div>
                    <div class="new-release__time">
                        <div class="new-release__time--rank">#${index+1}</div>
                        <div class="new-release__time--date">26.04.2022</div>
                    </div>
                </div>
            </div>
            `
        })
        carouselNewRelease.innerHTML = htmls.join('')
    },
    renderPlaylistPersonal: ()=>{
        const htmls = playlistData.map((playlist, index)=>{
            return `
            <a href="." class="playlist__carousel-item" id=${index}>
                <div class="playlist__carousel-item--img">
                    <img src=${playlist.thumbnail} alt="#" />
                    <i class="bi bi-play-circle"></i>
                </div>
                <div class="playlist__carousel-item--title">
                    ${playlist.album}
                </div>
                <div class="playlist__carousel-item--subtitle">
                    ${playlist.singer}
                </div>
            </a>`
        })
        playlistPersonal.innerHTML = htmls.join('')  
    },
    renderAlbumPersonal: ()=>{
        const htmls = playlistData.slice().reverse().map((playlist, index)=>{
            return `
            <a href="." class="playlist__carousel-item" id=${index}>
                <div class="playlist__carousel-item--img">
                    <img src=${playlist.thumbnail} alt="#" />
                    <i class="bi bi-play-circle"></i>
                </div>
                <div class="playlist__carousel-item--title">
                    ${playlist.album}
                </div>
            </a>`
        })
        albumPersonal.innerHTML = htmls.join('')  
    },
    renderMVPersonal: ()=>{
        const htmls = videoData.map((mv, index)=>{
            return `
                <div class="playlist__mv-item">
                    <div class="playlist__mv-item--video">
                        <video 
                        src=${mv.path} 
                        width="330" 
                        height="186"
                        poster=${mv.poster}>
                        </video>
                    </div>
                    <div class="playlist__mv-item--info">
                        <div class="mv-item__info--thumbnail">
                            <img src=${mv.avatar} alt="">
                        </div>
                        <div class="mv-item__info--content">
                            <div class="info__content-title">${mv.name}</div>
                            <div class="info__content-subtitle">${mv.singer}</div>
                        </div>
                    </div>
                </div>
            `
        })
        mvPersonal.innerHTML = htmls.join('')
    },
    renderZingChart: ()=>{
        const htmls = rankTableData.data.song.slice(0, 3).map((item, index)=>{
            return `
            <div class="chart__legend-box--item">
                <div class="legend-box__item-number">${item.position}
                </div>
                <div class="legend-box__item-song">
                    <div class="legend-box__item-song--thumbnail">
                        <img src=${item.thumbnail} width="50px">
                    </div>
                    <div class="legend-box__item-song--info">
                        <div class="song__info-title">
                            ${item.title}
                        </div>
                        <div class="song__info-subtitle">
                            ${item.artists_names}
                        </div>
                    </div>
                    <div class="legend-box__item-song--percent">
                    ${item.total}
                    </div>
                </div>
            </div>
            `
        })
        const btnElement = `<div class="chart__legend--show-more">
                                <a href="#">Xem Thêm</a>
                            </div>`
        chartLegendBox.innerHTML = htmls.concat(btnElement).join('')
    },
    handleHoverVideo: ()=>{
        Array.from($$('.playlist__mv-item--video video')).forEach((item, index)=>{
            item.onmouseover = () =>{
                item.controls = true
            }
            item.onmouseout = () =>{
                item.controls = false
            }
        })
    },
    loadZingChart: () =>{
        var xValues = ['17:00','19:00','21:00','23:00','01:00','03:00','05:00','07:00','09:00','11:00', '13:00', '15:00'];
        const ctx = document.getElementById('myChart').getContext('2d');
        const myChart = new Chart(ctx, {
        type: "line",
        data: {
            labels: xValues,
            datasets: [{
            label: rankTableData.data.song[0].title, 
            data: [860,1140,1060,1060,1070,1110,1330,2210,7830,2478, 4000, 4800],
            borderColor: "red",
            fill: false,
            backgroundColor: 'rgba(255, 0, 0, 0.6)',
            pointHoverBackgroundColor: "#fff",
            hoverBorderColor: "#fff"
            
            }, { 
            label: rankTableData.data.song[1].title, 
            data: [1600,1700,1700,1900,2000,2700,4000,5000,6000,7000, 5000, 6600],
            borderColor: "yellow",
            fill: false,
            backgroundColor: 'rgba(216, 250, 8, 0.6)'
            }, { 
            label: rankTableData.data.song[2].title, 
            data: [300,700,2000,5000,6000,4000,2000,1000,200,100, 1200, 2000],
            borderColor: "blue",
            fill: false,
            backgroundColor: 'rgba(0, 0, 255, 0.6)'
            }]
        },
        options: {
            tension: 0.4,
            plugins: {
                legend: {
                display: false
                },
                tooltip: {
                mode: 'index',
                intersect: false
                }
            },
            hover: {
                mode: 'nearest',
                intersect: false
                }
            },
            
        });
        const songItemLegend = $$('.chart__legend-box--item')
        songItemLegend.forEach((item, index)=>{
                item.style.backgroundColor = myChart.data.datasets[index].backgroundColor
            }
        )
        songItemLegend.forEach((item, index)=>{
            item.onclick = () =>{
                toggleData(index)
            }
        })

        toggleData = (value) =>{
            const visibilityData = myChart.isDatasetVisible(value)
            if(visibilityData){
                myChart.hide(value)
            }
            else{
                myChart.show(value)
            }
        }
    },
    loadCurrentSong:() =>{
        if(app.isPlayPersonalSong){
            songTitle.innerText = app.currentSong.name
            songSinger.innerText = app.currentSong.singer
            cdThumb.style.backgroundImage = `url('${app.currentSong.thumbnail}')`
            audio.src = app.currentSong.path
        }
        else if(app.isPlayUSUK){
            app.currentSongUSUK = 0
            songTitle.innerText = app.currentSongUSUK.name
            songSinger.innerText = app.currentSongUSUK.singer
            cdThumb.style.backgroundImage = `url('${app.currentSongUSUK.thumbnail}')`
            audio.src = app.currentSongUSUK.path
        }
        else if(app.isPlayEDM){
            app.currentSongEDM = 0
            songTitle.innerText = app.currentSongEDM.name
            songSinger.innerText = app.currentSongEDM.singer
            cdThumb.style.backgroundImage = `url('${app.currentSongEDM.thumbnail}')`
            audio.src = app.currentSongEDM.path
        }
        else{
            app.currentPlaylist = 0
            songTitle.innerText = app.currentPlaylist.name
            songSinger.innerText = app.currentPlaylist.artists_names
            cdThumb.style.backgroundImage = `url('${app.currentPlaylist.thumbnail}')`
            audio.src = `http://api.mp3.zing.vn/api/streaming/audio/${app.currentPlaylist.id}/320`
        }
    
    },
    fancyTimeFormat: (duration)=>{
        var hrs = ~~(duration / 3600)
        var mins = ~~((duration % 3600) / 60)
        var secs = ~~duration % 60
        // Output like "1:01" or "4:03:59" or "123:03:59"
        var ret = ""
        if (hrs > 0) {
            ret += "" + hrs + ":" + (mins < 10 ? "0" : "")
        }
        ret += "" + mins + ":" + (secs < 10 ? "0" : "")
        ret += "" + secs
        return ret
    },
    randomSong: ()=>{
 
 
        let maxLength
        if(app.isPlayPersonalSong){
            maxLength = songData.length
            
        }
        else if(app.isPlayUSUK){
            maxLength = songDataUSUK.length
        }
        else if(app.isPlayEDM){
            maxLength = songDataEDM.length
        }
        else{
            maxLength = playlistData.length
        }
        let newIndex  
        do{
            newIndex = Math.floor(Math.random() * maxLength)
        }while(newIndex === this.currentIndex)
        app.currentIndex = newIndex
        if(app.isPlayPersonalSong){
            Array.from($$('.personal__song--list-item')).forEach((item)=>{
                if(item.classList.contains('active')){
                    item.classList.remove('active')
                    item.firstElementChild.firstElementChild.nextElementSibling.firstElementChild.style.display = 'none'
                    item.firstElementChild.firstElementChild.nextElementSibling.lastElementChild.style.filter = 'brightness(100%)'
                }
            })
            const itemCurrent = $$('.personal__song--list-item')[app.currentIndex]
            itemCurrent.classList.add('active')
            const waveActiveSong = itemCurrent.firstElementChild.firstElementChild.nextElementSibling.firstElementChild
            const thumbnailActiveSong = itemCurrent.firstElementChild.firstElementChild.nextElementSibling.lastElementChild
            waveActiveSong.style.display = 'flex'
            thumbnailActiveSong.style.filter = 'brightness(50%)'
            app.loadCurrentSong();
            audio.play()
        }
        else if(app.isPlayUSUK){
            app.activeItemWhenChangingPlaylist($$(' .menu-side__song.us-uk .menu-side__song-item'))
        }
        else if(app.isPlayEDM){
            app.activeItemWhenChangingPlaylist($$(' .menu-side__song.edm .menu-side__song-item'))
        }
        else{
            app.activeItemWhenChangingPlaylist($$('.menu-side__song-item'))
        }
        
    },
    animationCD: ()=>{
        
    },
    removeSongItemActive : (elementNodeList)=>{
        Array.from(elementNodeList).forEach((item)=>{
            if(item.classList.contains('active')){
                item.classList.remove('active')
                const icon = item.lastElementChild.firstElementChild
                const wave = item.firstElementChild.nextElementSibling.firstElementChild
                const thumbnail = item.firstElementChild.nextElementSibling.lastElementChild
                icon.classList.replace('bi-pause-circle-fill', 'bi-play-circle-fill')
                wave.style.display = 'none'
                thumbnail.style.filter = 'brightness(100%)'
            }
        })
    },
    activeItemWhenChangingPersonal: (listItemSong)=>{
        Array.from(listItemSong).forEach((item)=>{
            if(item.classList.contains('active')){
                item.classList.remove('active')
                item.firstElementChild.firstElementChild.nextElementSibling.firstElementChild.style.display = 'none'
                item.firstElementChild.firstElementChild.nextElementSibling.lastElementChild.style.filter = 'brightness(100%)'
            }
        })
        const waveActiveSong = listItemSong[app.currentIndex].firstElementChild.firstElementChild.nextElementSibling.firstElementChild
        const imgActiveSong = listItemSong[app.currentIndex].firstElementChild.firstElementChild.nextElementSibling.lastElementChild
        waveActiveSong.style.display = 'flex'
        imgActiveSong.style.filter = 'brightness(50%)'
    },
    activeItemWhenChangingPlaylist: (listItemSong)=>{
        app.removeSongItemActive(listItemSong)
        listItemSong[app.currentIndex].classList.add('active')
        const iconElement = listItemSong[app.currentIndex].lastElementChild.firstElementChild
        iconElement.classList.replace('bi-play-circle-fill', 'bi-pause-circle-fill')
        app.loadCurrentSong()
        audio.play()
        const waveActiveSong = listItemSong[app.currentIndex].firstElementChild.nextElementSibling.firstElementChild
        const imgActiveSong = listItemSong[app.currentIndex].firstElementChild.nextElementSibling.lastElementChild
        waveActiveSong.style.display = 'flex'
        imgActiveSong.style.filter = 'brightness(50%)'
    },
    selectTheme: ()=>{
        themeModal.onclick = e => {
            const type = e.target.closest('.theme-modal__content--item').dataset.type
            const indexOfType = e.target.closest('.content__item--theme').dataset.index
            const colors = themes[type].list[indexOfType].details   
            app.setConfiguration('theme', colors)
            if(e.target.classList.contains('item__theme--apply')){
                document.documentElement.style.setProperty('--primary-bg', colors.primaryBg)
                document.documentElement.style.setProperty('--menu-side-bg', colors.menuSideBg)
                document.documentElement.style.setProperty('--music-play-bg', colors.musicPlayBg)
                document.documentElement.style.setProperty('--theme-modal-bg', colors.themeModalBg)
                document.documentElement.style.setProperty('--text-color', colors.textColor)
                document.documentElement.style.setProperty('--active-color', colors.activeColor)
                document.documentElement.style.setProperty('--none-active-color', colors.noneActiveColor)
                document.documentElement.style.setProperty('--border-layout', colors.borderLayout)
                document.documentElement.style.setProperty('--background-image', colors.backgroundImage)
                document.documentElement.style.setProperty('--sub-text-color', colors.subTextColor)
                btnCloseTheme.click()
            }
            else if(e.target.classList.contains('item__theme--preview')){
                document.documentElement.style.setProperty('--primary-bg', colors.primaryBg)
                document.documentElement.style.setProperty('--menu-side-bg', colors.menuSideBg)
                document.documentElement.style.setProperty('--music-play-bg', colors.musicPlayBg)
                document.documentElement.style.setProperty('--theme-modal-bg', colors.themeModalBg)
                document.documentElement.style.setProperty('--text-color', colors.textColor)
                document.documentElement.style.setProperty('--active-color', colors.activeColor)
                document.documentElement.style.setProperty('--none-active-color', colors.noneActiveColor)
                document.documentElement.style.setProperty('--background-image', colors.backgroundImage)
                document.documentElement.style.setProperty('--border-layout', colors.borderLayout)
                document.documentElement.style.setProperty('--sub-text-color', colors.subTextColor)
            }
        }
    },
    selectSongPlaylist: ()=>{
        menuSongPlaylist.onclick = e =>{
            app.isPlayPersonalSong = false
            app.isPlayEDM = false
            app.isPlayUSUK = false
            Array.from($$('.personal__song--list-item')).forEach((item)=>{
                if(item.classList.contains('active')){
                    item.classList.remove('active')
                    item.firstElementChild.firstElementChild.nextElementSibling.firstElementChild.style.display = 'none'
                    item.firstElementChild.firstElementChild.nextElementSibling.lastElementChild.style.filter = 'brightness(100%)'
                }
            })
            app.removeSongItemActive($$('.menu-side__song-item'))
            const songItem = e.target.closest('.menu-side__song-item')
            songItem.classList.add('active')
            const icon = songItem.lastElementChild.firstElementChild
            const wavePlaylist = songItem.firstElementChild.nextElementSibling.firstElementChild
            const thumbnail = songItem.firstElementChild.nextElementSibling.lastElementChild
            icon.classList.replace('bi-play-circle-fill', 'bi-pause-circle-fill')
            wavePlaylist.style.display = 'flex'
            thumbnail.style.filter = 'brightness(50%)'
            app.currentIndex = songItem.getAttribute('data-index')
            app.loadCurrentSong()
            audio.play()
            app.cdThumbRotate.play()
            Array.from(noteMusicAnimate).forEach((item)=>{
                item.style.display = 'block'
            })
            
        }
    },
    selectSongPlaylistUSUK: ()=>{
        menuSongPlaylistUSUK.onclick = e =>{
            app.isPlayPersonalSong = false,
            app.isPlayUSUK = true
            app.isPlayEDM = false
            Array.from($$('.personal__song--list-item')).forEach((item)=>{
                if(item.classList.contains('active')){
                    item.classList.remove('active')
                    item.firstElementChild.firstElementChild.nextElementSibling.firstElementChild.style.display = 'none'
                    item.firstElementChild.firstElementChild.nextElementSibling.lastElementChild.style.filter = 'brightness(100%)'
                }
            })
            app.removeSongItemActive($$('.menu-side__song-item'))
            const songItem = e.target.closest('.menu-side__song-item')
            songItem.classList.add('active')
            const icon = songItem.lastElementChild.firstElementChild
            const wavePlaylist = songItem.firstElementChild.nextElementSibling.firstElementChild
            const thumbnail = songItem.firstElementChild.nextElementSibling.lastElementChild
            icon.classList.replace('bi-play-circle-fill', 'bi-pause-circle-fill')
            wavePlaylist.style.display = 'flex'
            thumbnail.style.filter = 'brightness(50%)'
            app.currentIndex = songItem.getAttribute('data-index')
            app.loadCurrentSong()
            audio.play()
            app.cdThumbRotate.play()
            Array.from(noteMusicAnimate).forEach((item)=>{
                item.style.display = 'block'
            })
            
        }
    },
    selectSongPlaylistEDM: ()=>{
        menuSongPlaylistEDM.onclick = e =>{
            app.isPlayPersonalSong = false,
            app.isPlayUSUK = false
            app.isPlayEDM = true
            Array.from($$('.personal__song--list-item')).forEach((item)=>{
                if(item.classList.contains('active')){
                    item.classList.remove('active')
                    item.firstElementChild.firstElementChild.nextElementSibling.firstElementChild.style.display = 'none'
                    item.firstElementChild.firstElementChild.nextElementSibling.lastElementChild.style.filter = 'brightness(100%)'
                }
            })
            app.removeSongItemActive($$('.menu-side__song-item'))
            const songItem = e.target.closest('.menu-side__song-item')
            songItem.classList.add('active')
            const icon = songItem.lastElementChild.firstElementChild
            const wavePlaylist = songItem.firstElementChild.nextElementSibling.firstElementChild
            const thumbnail = songItem.firstElementChild.nextElementSibling.lastElementChild
            icon.classList.replace('bi-play-circle-fill', 'bi-pause-circle-fill')
            wavePlaylist.style.display = 'flex'
            thumbnail.style.filter = 'brightness(50%)'
            app.currentIndex = songItem.getAttribute('data-index')
            app.loadCurrentSong()
            audio.play()
            app.cdThumbRotate.play()
            Array.from(noteMusicAnimate).forEach((item)=>{
                item.style.display = 'block'
            })
            
        }
    },
    selectSongPersonal: ()=>{
        personalSongPlaylist.onclick = e => {
            app.isPlayPersonalSong = true
            app.isPlayUSUK = false
            app.isPlayEDM = false
            app.removeSongItemActive($$('.menu-side__song-item'))
            Array.from($$('.personal__song--list-item')).forEach((item)=>{
                if(item.classList.contains('active')){
                    item.classList.remove('active')
                    item.firstElementChild.firstElementChild.nextElementSibling.firstElementChild.style.display = 'none'
                    item.firstElementChild.firstElementChild.nextElementSibling.lastElementChild.style.filter = 'brightness(100%)'
                }
            })

            const songItem = e.target.closest('.personal__song--list-item')
            songItem.classList.add('active')
            songItem.firstElementChild.firstElementChild.nextElementSibling.firstElementChild.style.display = 'flex'
            songItem.firstElementChild.firstElementChild.nextElementSibling.lastElementChild.style.filter = 'brightness(50%)'
            app.currentIndex = songItem.getAttribute('data-index')
            app.loadCurrentSong()
            audio.play()
            app.cdThumbRotate.play()
            Array.from(noteMusicAnimate).forEach((item)=>{
                item.style.display = 'block'
            })
        }
    },
    handleEvent: ()=>{
        
        const listItemSong = $$('.menu-side__song-item')
        const listItemSongPersonal = $$('.personal__song--list-item')
        app.cdThumbRotate.pause()
        Array.from(noteMusicAnimate).forEach((item)=>{
            item.style.display = 'none'
        })
        btnPlay.onclick = () => {
            
            if(!app.isPlaying && audio.paused){
                audio.play()
                Array.from(noteMusicAnimate).forEach((item)=>{
                    item.style.display = 'block'
                })
                app.cdThumbRotate.play()
                if(!app.isPlayPersonalSong){
                    const wavePlaylist = listItemSong[app.currentIndex].firstElementChild.nextElementSibling.firstElementChild
                    const thumbnailPlaylist = listItemSong[app.currentIndex].firstElementChild.nextElementSibling.lastElementChild
                    const iconPlaylist = listItemSong[app.currentIndex].lastElementChild.firstElementChild
                    iconPlaylist.classList.replace('bi-play-circle-fill', 'bi-pause-circle-fill')
                    wavePlaylist.style.display = 'flex'
                    thumbnailPlaylist.style.filter = 'brightness(50%)'
                }
                else{
                    const wavePersonal = listItemSongPersonal[app.currentIndex].firstElementChild.firstElementChild.nextElementSibling.firstElementChild
                    wavePersonal.classList.add('active')
                }
            }
            else{
                audio.pause()
                app.cdThumbRotate.pause()
                Array.from(noteMusicAnimate).forEach((item)=>{
                    item.style.display = 'none'
                })
                if(!app.isPlayPersonalSong){
                    const wavePlaylist = listItemSong[app.currentIndex].firstElementChild.nextElementSibling.firstElementChild
                    const thumbnailPlaylist = listItemSong[app.currentIndex].firstElementChild.nextElementSibling.lastElementChild
                    const iconPlaylist = listItemSong[app.currentIndex].lastElementChild.firstElementChild
                    iconPlaylist.classList.replace('bi-pause-circle-fill', 'bi-play-circle-fill')
                    wavePlaylist.style.display = 'none'
                    thumbnailPlaylist.style.filter = 'brightness(100%)'
                }
                else{
                    const wavePersonal = listItemSongPersonal[app.currentIndex].firstElementChild.firstElementChild.nextElementSibling.firstElementChild
                    wavePersonal.classList.remove('active')      
                }
                btnPlayAll.firstElementChild.classList.replace('bi-pause-fill', 'bi-play-fill')
            }
            
        }
        btnNext.onclick = () => {
            if(app.isRandom){
                app.randomSong()
            }
            else{
                var maxLength
                if(app.isPlayPersonalSong){
                    maxLength = songData.length - 1
                }
                else if(app.isPlayUSUK){
                    maxLength = songDataUSUK.length - 1
                }
                else if(app.isPlayEDM){
                    maxLength = songDataEDM.length - 1
                }
                else{
                    maxLength = playlistData.length - 1
                }
                app.currentIndex >= maxLength 
                ? app.currentIndex = 0 
                : app.currentIndex++
                if(app.isPlayPersonalSong){
                    Array.from($$('.personal__song--list-item')).forEach((item)=>{
                        if(item.classList.contains('active')){
                            item.classList.remove('active')
                            item.firstElementChild.firstElementChild.nextElementSibling.firstElementChild.style.display = 'none'
                            item.firstElementChild.firstElementChild.nextElementSibling.lastElementChild.style.filter = 'brightness(100%)'
                        }
                    })
                    const itemCurrent = $$('.personal__song--list-item')[app.currentIndex]
                    itemCurrent.classList.add('active')
                    itemCurrent.firstElementChild.firstElementChild.nextElementSibling.firstElementChild.style.display = 'flex'
                    itemCurrent.firstElementChild.firstElementChild.nextElementSibling.lastElementChild.style.filter = 'brightness(50%)'
                    app.loadCurrentSong()
                    audio.play()
                }else if(app.isPlayUSUK){
                    app.activeItemWhenChangingPlaylist($$(' .menu-side__song.us-uk .menu-side__song-item'))
                }
                else if(app.isPlayEDM){
                    app.activeItemWhenChangingPlaylist($$(' .menu-side__song.edm .menu-side__song-item'))
                }
                else{    
                    

                    app.activeItemWhenChangingPlaylist($$('.menu-side__song-item'))
                }
                
            }
        }
        btnPrev.onclick = () => {
            let maxLength
            if(app.isPlayPersonalSong){
                maxLength = songData.length - 1
            }
            else if(app.isPlayUSUK){
                maxLength = songDataUSUK.length - 1
            }
            else if(app.isPlayEDM){
                maxLength = songDataEDM.length - 1
            }
            else{
                maxLength = playlistData.length - 1
            }
            app.currentIndex <= 0 ? app.currentIndex = maxLength : app.currentIndex--
            if(app.isPlayPersonalSong){
                Array.from($$('.personal__song--list-item')).forEach((item)=>{
                    if(item.classList.contains('active')){
                        item.classList.remove('active')
                        item.firstElementChild.firstElementChild.nextElementSibling.firstElementChild.style.display = 'none'
                        item.firstElementChild.firstElementChild.nextElementSibling.lastElementChild.style.filter = 'brightness(100%)'
                    }
                })
                const itemCurrent = $$('.personal__song--list-item')[app.currentIndex]
                itemCurrent.classList.add('active')
                itemCurrent.firstElementChild.firstElementChild.nextElementSibling.firstElementChild.style.display = 'flex'
                itemCurrent.firstElementChild.firstElementChild.nextElementSibling.lastElementChild.style.filter = 'brightness(50%)'
                app.loadCurrentSong()
                audio.play()
            }
            else if(app.isPlayUSUK){
                app.activeItemWhenChangingPlaylist($$(' .menu-side__song.us-uk .menu-side__song-item'))
            }
            else if(app.isPlayEDM){
                app.activeItemWhenChangingPlaylist($$(' .menu-side__song.edm .menu-side__song-item'))
            }
            else{
                app.activeItemWhenChangingPlaylist($$('.menu-side__song-item'))
            }
        }
        btnRepeat.onclick = () => {
            app.isRepeat = !app.isRepeat
            app.setConfiguration('isRepeat', app.isRepeat)
            btnRepeat.classList.toggle('active', app.isRepeat)
        }
        btnRandom.onclick = () => {
            app.isRandom = !app.isRandom
            app.setConfiguration('isRandom', app.isRandom)
            btnRandom.classList.toggle('active', app.isRandom)
        }
        btnPlayAll.onclick = () => {
            app.isPlayPersonalSong = !app.isPlayPersonalSong
            app.currentIndex = 0
            if(app.isPlayPersonalSong){
                btnPlayAll.firstElementChild.classList.replace('bi-play-fill', 'bi-pause-fill')
                app.removeSongItemActive($$('.menu-side__song-item'))
                app.activeItemWhenChangingPersonal($$('.personal__song--list-item'))
                app.activeItemWhenChangingPlaylist($$('.personal__song--list-item'))
            }
            else{
                btnPlayAll.firstElementChild.classList.replace('bi-pause-fill', 'bi-play-fill')
                Array.from($$('.personal__song--list-item')).forEach((item)=>{
                    if(item.classList.contains('active')){
                        item.classList.remove('active')
                        item.firstElementChild.firstElementChild.nextElementSibling.firstElementChild.style.display = 'none'
                        item.firstElementChild.firstElementChild.nextElementSibling.lastElementChild.style.filter = 'brightness(100%)'
                    }
                })
                audio.pause()
            }
            
        }
        progress.onchange = e => {
            var seekTime = (e.target.value / 100) * audio.duration
            audio.currentTime = seekTime 
        }
        volume.onchange = e => {
            var seekVolume = e.target.value / 100
            audio.volume = seekVolume
            seekbarVolume.style.width = `${seekVolume * 100}%`
            seekdotVolume.style.left = `${seekVolume * 100}%`
        }
        iconVolume.onclick = () => {
            app.isMute = !app.isMute
            if(app.isMute){
                audio.volume = 0
                iconVolume.classList.replace('bi-volume-down', 'bi-volume-mute-fill')
            }
            else{
                var currentVolume = seekbarVolume.offsetWidth
                audio.volume = currentVolume / 100
                iconVolume.classList.replace('bi-volume-mute-fill', 'bi-volume-down')
            }
        }
        audio.onplay = () => {
            app.isPlaying = true
            wave.classList.add('active')
            btnPlay.classList.replace('bi-play-circle', 'bi-pause-circle')
        }
        audio.onpause = () => {
            app.isPlaying = false
            wave.classList.remove('active')
            btnPlay.classList.replace('bi-pause-circle', 'bi-play-circle')
        }
        audio.onloadedmetadata = function() {
            timeEnd.innerText = app.fancyTimeFormat(audio.duration)
        }
        audio.ontimeupdate = () => {
            var progressTime = Math.floor(audio.currentTime)
            if(audio.duration){
                var percentProgress = (progressTime/audio.duration)*100
                seekbar.style.width = `${percentProgress}%`
                seekdot.style.left = `${percentProgress}%`
                progress.value = percentProgress
            }
            
            timeStart.innerText = app.fancyTimeFormat(progressTime)
            
        }
        audio.onended = () => {
            app.isRepeat ? audio.play() : btnNext.click()
            if(app.isRandom && !app.isRepeat){
                app.randomSong()
            }
        }
        btnRepeat.classList.toggle('active', app.isRepeat)
        btnRandom.classList.toggle('active', app.isRandom)
    },
    renderSearchResult: (data) =>{
        const htmls = data.map((item, index)=>{
            return `
            <a href="#${index}" class="search__result--item">
              <div class="result__item--img">
                <img src=${item.thumbnail} alt="Song Image">
              </div>
              <div class="result__item--content">
                <h3 class="content__title">
                  ${item.name}
                </h3>
                <h4 class="content__subtitle">
                    ${item.artists_names}
                </h4>
              </div>
            </a>`
        })
        searchContainer.innerHTML = htmls.join('')  
    },
    onSearch: ()=>{
        
        searchInput.addEventListener('keyup', (e)=>{
          
            if(searchInput.value.trim().length > 0){
                searchContainer.style.display = 'flex'
                var dataRender = app.handleSearch(e.target.value, rankTableData.data.song)
                app.renderSearchResult(dataRender)
            }
            else{
                searchContainer.style.display = 'none'
            }
        })
        songSide.onclick = () =>{
            searchContainer.style.display = 'none'
        }
    
        
    },
    handleSearch: (value, data) =>{
        var result = []
        for(var i = 0; i<data.length; i++){
            value = value.toLowerCase()
            var name = data[i].name.toLowerCase()
            if(name.includes(value)){
                result.push(data[i])
            }
        }
        return result
    },
    start: ()=>{
        app.onSearch()
        app.loadConfiguration()
        app.defineProperties()
        app.renderTheme()
        app.renderMenuSong()
        app.renderMenuSongUSUK()
        app.renderMenuSongEDM()
        app.renderPersonalSong()
        app.renderCarouselPlaylist()
        app.renderCarouselSinger()
        app.renderNewRelease()
        app.renderPlaylistPersonal()
        app.renderAlbumPersonal()
        app.renderMVPersonal()
        app.renderZingChart()
        app.loadCurrentSong()
        app.loadZingChart()
        app.handleEvent()
        app.selectTheme()
        app.selectSongPlaylist()
        app.selectSongPlaylistUSUK()
        app.selectSongPlaylistEDM()
        app.selectSongPersonal()
        app.handleHoverVideo()
    }
}

/*-----SCROLL MAINPAGE-----*/
songSide.onscroll = (e) =>{
    heading.classList.toggle('sticky', e.target.scrollTop > 0)
    bannerTitle.classList.toggle('fade-out', e.target.scrollTop > 0)
    bannerContent.classList.toggle('fade-out', e.target.scrollTop > 0)
}

/*-----TAB SELECTED MAINPAGE-----*/
tabs.forEach((tab, index)=>{
    const songSideContainerItem = songSideContainer[index]
    tab.onclick = () => {
        $('.song-side__heading--tabs .tab-item.active').classList.remove('active')
        $('.song-side__container.active').classList.remove('active')
        tab.classList.add('active')
        songSideContainerItem.classList.add('active')
    }
})

/*-----Auto Slideshow-----*/
let index = 2
showSlides = () =>{
    const slideFirst = $('.song__animate-img--item.first')
    const slideSecond = $('.song__animate-img--item.second')
    const sildeThird = listSlide[index === listSlide.length - 1 ? 0 : index+1]
    slideFirst.classList.replace('first', 'third')
    slideSecond.classList.replace('second', 'first')
    sildeThird.classList.replace('third', 'second')
    index++
    if(index >= listSlide.length){
        index = 0
    }
    setTimeout(showSlides, 2000)
}
showSlides()

/*-----Handle button arrow-----*/
leftScrollPlaylist.onclick = () => carouselPlaylist.scrollLeft -= 300
rightScrollPlaylist.onclick = () => carouselPlaylist.scrollLeft += 300
leftScrollSinger.onclick = () => carouselSinger.scrollLeft -= 300
rightScrollSinger.onclick = () => carouselSinger.scrollLeft += 300
leftScrollPlaylistPersonal.onclick = () => playlistPersonal.scrollLeft -= 300
rightScrollPlaylistPersonal.onclick = () => playlistPersonal.scrollLeft += 300
leftScrollAlbumPersonal.onclick = () => albumPersonal.scrollLeft -= 300
rightScrollAlbumPersonal.onclick = () => albumPersonal.scrollLeft += 300
leftScrollMVPersonal.onclick = () => mvPersonal.scrollLeft -= 400
rightScrollMVPersonal.onclick = () => mvPersonal.scrollLeft += 400
leftScrollSingerPersonal.onclick = () => singerPersonal.scrollLeft -= 300
rightScrollSingerPersonal.onclick = () => singerPersonal.scrollLeft += 300

/*-----Handle Click Menu Setting-----*/
btnTheme.onclick = () =>{
    modalTheme.style.display = 'block'
    mainPage.style.filter = 'brightness(50%)'
}
btnCloseTheme.onclick = () => {
    modalTheme.style.display = 'none'
    mainPage.style.filter = 'brightness(100%)'
}

/*-----TAB SELECTED PERSONAL-----*/
const tabsPersonal = $$('.personal__navbar-item')
const tabsContentPersonal = $$('.container__personal--wrapper-item')

tabsPersonal.forEach((tab, index)=>{
    const tabContent = tabsContentPersonal[index-1]
    const gridContainer = $$('.container__personal--wrapper-item .song-side__playlist--carousel')
    const arrowPersonal = $$('.container__personal--control .personal__title--right')
    tab.onclick = () =>{
        if(index == 0){
            $('.personal__song--animate').style.display='block'
            $('.personal__song--list').style.width = 'auto'
            $('.personal__song--list').style.overflow = 'hidden'
            $('.personal__song--list').style.overflowY = 'auto'
            $('.container__personal--wrapper-item.active').classList.remove('active')
            $$('.container__personal--wrapper-item').forEach((item)=>{
                item.classList.add('active')
            })
            Array.from(gridContainer).forEach((item, index)=>{
                item.style.display = 'flex'
                item.style.gridTemplateColumns = 'unset'
                item.style.gridGap= '0px'
            })
            Array.from(arrowPersonal).forEach((item, index)=>{
                item.style.display = 'block'
            })
        }
        else{
            if(index == 1){
                $('.personal__song--animate').style.display='none'
                $('.personal__song--list').style.width = '100%'
                $('.personal__song--list').style.overflow = 'unset'
                $('.personal__song--list').style.overflowY = 'unset'
            }
            $$('.container__personal--wrapper-item.active').forEach((item)=>{
                item.classList.remove('active')
            })
            
            tabContent.classList.add('active')
            Array.from(gridContainer).forEach((item, index)=>{
                if(item.classList.contains('mv')){
                    item.style.gridTemplateColumns = 'repeat(auto-fit, minmax(300px, 1fr))'          
                }
                else{
                    
                    item.style.gridTemplateColumns = 'repeat(auto-fit, minmax(150px, 1fr))'
                }
                item.style.display = 'grid'
                item.style.gridGap= '20px'
                
            })

            Array.from(arrowPersonal).forEach((item, index)=>{
                item.style.display = 'none'
            })
        }
        $('.personal__navbar-item.active').classList.remove('active')
        tab.classList.add('active')
        
    }
})

/*-----TAB SELECTED MENU SONG-----*/
const menuPlaylist = $$('.menu-side__playlist h4')
const menuSideSong = $$('.menu-side__song')
menuPlaylist.forEach((menu, index)=>{
    const side = menuSideSong[index]
    menu.onclick = () =>{
        $('.menu-side__playlist h4.active').classList.remove('active')
        $('.menu-side__song.active').classList.remove('active')
        menu.classList.add('active')
        side.classList.add('active')
    }
})


/*-----RESPONSIVE-----*/
btnOpenMenuSide.onclick = () => {
    menuSide.style.width = '100%'
    menuSide.style.display = 'block'
}
btnCloseMenuSide.onclick = () => {
    menuSide.style.display = 'none'
}






export default {
    path : '/movie',
    component : () => import ('@/views/Movie'),
    children : [
        {
            path : 'nowPlaying',
            component : () => import ('@/components/NowPlaying'),
        },
        {
            path : 'detail/1/:movieId',
            components : {
                default : () => import('@/components/NowPlaying'),
                detail : () => import('@/views/Movie/detail.vue')
            },
            props :{
               detail :true
            }
        },
        {
            path : 'detail/2/:movieId',
            components : {
                default : () => import('@/components/ComingSoon'),
                detail : () => import('@/views/Movie/detail.vue')
            },
            props :{
               detail :true
            }
        },
        {
            path : 'comingSoon',
            component : () => import ('@/components/ComingSoon'),
        },
        {
            path : 'city',
            component : () => import ('@/components/City'),
        },
        {
            path : 'search',
            component : () => import ('@/components/Search'),
        },
        {
            path : '/movie',
            redirect : '/movie/nowPlaying'
        }
    ]
}
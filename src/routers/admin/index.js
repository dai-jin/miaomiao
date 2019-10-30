export default {
    path : '/admin',
    component : () => import ('@/views/Admin'),
    children : [
       {
        path : 'user',
        component : ()=> import('@/views/Admin/user')
       },
       {
        path : 'movie',
        component : ()=> import('@/views/Admin/movie')
       },
       {
        path : 'cinema',
        component : ()=> import('@/views/Admin/cinema')
       },
       {
         path : '/admin',
         redirect : 'user'
       }
    ]
}
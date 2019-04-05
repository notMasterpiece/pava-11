import NotFound from './pages/NotFound/NotFound';
import Settings from './pages/Settings/Settings';
import MessagesIndex from './pages/messages/MessagesIndex';
import PostFeedIndex from './pages/feed/PostFeedIndex';
import AllPosts from './pages/posts/AllPosts';
import SinglePostWrap from './pages/posts/SinglePostWrap';
import AddEducation from './pages/add-education/AddEducation';
import AddExperiense from './pages/add-experiense/AddExperiense';
import EditProfile from './pages/edit-profile/EditProfile';
import CreateProfile from './pages/create-profile/CreateProfile';
import AllProfiles from './pages/profiles/AllProfilesIndex';
import CustomeUserProfile from './pages/custome-user-profile/CustomeUserIndex';
import Gallery from './pages/Gallery/GalleryIndex';
import Calendar from './pages/Calendar/Calendar';
import Content from './pages/profile/Content';
import Admin from './pages/Admin/Admin';
import PostCreate from './pages/blog/post-create/PostCreate';
import BlogIndex from './pages/blog/blogArticles/BlogIndex';
import BlogSingleIndex from './pages/blog/blogSingle/BlogSingleIndex';
import FakeIndex from './pages/fake/fakeIndex';
import Test from './pages/test';
import ServerError from './pages/500/Error_500';



const Routes = [
    {
        path: '/',
        component: Content,
    },
    {
        path: '/dashboard',
        component: Content,
    },
    {
        path: '/messages',
        component: MessagesIndex,
    },
    {
        path: '/messages/:id',
        component: MessagesIndex,
    },
    {
        path: '/settings',
        component: Settings,
    },
    {
        path: '/feed',
        component: PostFeedIndex,
    },
    {
        path: '/posts',
        component: AllPosts,
    },
    {
        path: '/post/:id',
        component: SinglePostWrap,
    },
    {
        path: '/add-education',
        component: AddEducation,
    },
    {
        path: '/add-experience',
        component: AddExperiense,
    },
    {
        path: '/edit-profile',
        component: EditProfile,
    },
    {
        path: '/create-profile',
        component: CreateProfile,
    },
    {
        path: '/profiles',
        component: AllProfiles,
    },

    {
        path: '/profile/:handle',
        component: CustomeUserProfile,
    },
    {
        path: '/admin',
        component: Admin,
    },
    {
        path: '/gallery',
        component: Gallery,
    },
    {
        path: '/blog',
        component: BlogIndex,
    },
    {
        path: '/blog/post-create',
        component: PostCreate,
    },
    {
        path: '/blog/:_id',
        component: BlogSingleIndex,
    },
    {
        path: '/calendar',
        component: Calendar,
    },
    {
        path: '/fake',
        component: FakeIndex,
    },
    {
        path: '/test',
        component: Test,
    },
    {
        path: '/error',
        component: ServerError,
    },
    {
        path: '/not-found',
        component: NotFound,
    },
];


export default Routes;
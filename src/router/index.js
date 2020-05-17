import Vue from 'vue'
import Router from 'vue-router'
import LoginPage from '../components/LoginPage'
import SearchPage from '../components/SearchPage'
import SearchResults from '../components/SearchResultsModule'
import AboutPage from '../components/AboutPage'
import LegalEntity from '../components/LegalEntity'
import SoleTrader from '../components/SoleTrader'
import Organization from '../components/Organization'
import EditLegalEntity from '../components/edit_pages/editLegalEntity'
import EditOrganization from '../components/edit_pages/editOrganization'
import EditSoleTrader from '../components/edit_pages/editSoleTrader'
import AddRegistrator from '../components/AddRegistrator'
import CreateLegalEntity from '../components/create_models/CreateLegalEntity'
import CreateSoleTrader from '../components/create_models/CreateSoleTrader'
import CreateOrganization from '../components/create_models/CreateOrganization'
import Journal from '../components/Journal'
import NotFound from '../components/NotFound'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/SearchResults',
      name: 'search-results',
      component: SearchResults,
      meta: {
        //requiresAuth: true,
      }
    },
    {
      path: '/SearchPage',
      name: 'search',
      component: SearchPage,
      params: { id: Number },
      meta: {
        //requiresAuth: true,
      }
    },
    {
      path: '/',
      name: 'about',
      component: AboutPage,
      meta: {
        //requiresAuth: true
      }
    },
    {
      path: '/LoginPage',
      name: 'login',
      component: LoginPage,
      meta: {
        guest: true
      }
    },
    {
      path: '/LegalEntity/:id',
      name: 'legalentity',
      component: LegalEntity,
      meta: {
        guest: true
      }
    },
    {
      path: '/Organization/:id',
      name: 'organization',
      component: Organization,
      meta: {
        guest: true
      }
    },
    {
      path: '/SoleTrader/:id',
      name: 'soletrader',
      component: SoleTrader,
      meta: {
        guest: true
      }
    },
    {
      path: '/LegalEntityEdit/:id',
      name: 'legalentityedit',
      component: EditLegalEntity,
      meta: {
        requiresRegistrator: true
      }
    },
    {
      path: '/OrganizationEdit/:id',
      name: 'organizationedit',
      component: EditOrganization,
      meta: {
        requiresRegistrator: true
      }
    },
    {
      path: '/SoleTraderEdit/:id',
      name: 'soletraderedit',
      component: EditSoleTrader,
      meta: {
        requiresRegistrator: true
      }
    },
    {
      path: '/AddRegistrator',
      name: 'addregistrator',
      component: AddRegistrator,
      meta: {
        is_admin: true
      }
    },
    {
      path: '/CreateLegalEntity',
      name: 'legalentitycreate',
      component: CreateLegalEntity,
      meta: {
        requiresRegistrator: true
      }
    },
    {
      path: '/CreateOrganization',
      name: 'organizationcreate',
      component: CreateOrganization,
      meta: {
        requiresRegistrator: true
      }
    },
    {
      path: '/CreateSoleTrader',
      name: 'soletradercreate',
      component: CreateSoleTrader,
      meta: {
        requiresRegistrator: true
      }
    },
    {
      path: '/Journal',
      name: 'journal',
      component: Journal,
      meta: {
        is_admin: true
      }
    },
    {
      path: '*',
      name: 'notfound',
      component: NotFound
    }
  ]
})

router.beforeEach((to, from, next) => {
  console.log('routing to:')
  console.log(to)
  if (to.matched.some(record => record.meta.requiresRegistrator)) {
    // console.log(localStorage.getItem('token'))
    if (localStorage.getItem('userrole') === 'registrant') {
      console.log('req auth no registrator')
      next()
    } else {
      next({name: 'login'})
    }
  }
  if (to.matched.some(record => record.meta.is_admin)) {
    if (localStorage.getItem('userrole') === 'admin') {
      next()
    } else {
      console.log('req auth no admin')
      next({ name: 'login' })
    }
  }
  next()
})

export default router

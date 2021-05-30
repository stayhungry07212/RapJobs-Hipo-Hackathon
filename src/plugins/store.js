import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'

Vue.use(Vuex)
    /* eslint-disable */
export default new Vuex.Store({
    state: {
        fb: {
            db: firebase.database()
        },
        user: null,
        error: null,
        userdetails: null,
        jobs: null,
        employers: null,
        ratings: null,
        test: null
    },
    mutations: {
        setUser(state, payload) {
            state.user = payload
        },
        setError(state, payload) {
            state.error = payload
        },
        gotUsers: (state, payload) => {
            state.userdetails.push(payload)
        },
        gotUser: (state, payload) => {
            state.userdetails = payload
        },
        emptyJobs: (state) => {
            state.jobs = []
        },
        gotJobs: (state, payload) => {
            state.jobs = payload
        },
        emptyEmployer: (state) => {
            state.employers = []
        },
        gotEmployer: (state, payload) => {
            state.employers = payload
        },
        emptyRating: (state) => {
            state.ratings = []
        },
        gotRating: (state, payload) => {
            state.ratings = payload
        },
        gotTest: (state, payload) => {
            state.test = payload
        },
        getTestResult: (state, payload) => {
            state.test = payload
        }
    },
    actions: {
        signIn({ commit }, payload) {
            firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
                .then(
                    user => {
                        const newUser = {
                            id: firebase.auth().currentUser.uid
                        }
                        commit('setUser', newUser)
                        firebase.database().ref('Employee/' + newUser.id)
                            .on('value', snap => {
                                const myObj = snap.val()
                                console.log(myObj)
                                commit('gotTest', myObj.Test)
                            })
                    }
                )
                .catch(
                    error => {
                        commit('setError', error)
                    }
                )
        },
        signUp({ commit }, payload) {
            firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
                .then(
                    user => {
                        const newUser = {
                            id: firebase.auth().currentUser.uid
                        }
                        commit('setUser', newUser)
                        firebase.database().ref('Employee/' + newUser.id).set({
                            Name: payload.name,
                            Surname: payload.surname,
                            Email: payload.email,
                            Test: false
                        })
                    }
                )
                .catch(
                    error => {
                        console.log(error)
                    }
                )
        },
        signOut({ commit }) {
            firebase.auth().signOut().then(function() {
                commit('setUser', null)
            }).catch(
                error => {
                    console.log(error)
                })
        },
        AuthChange({ commit }) {
            firebase.auth().onAuthStateChanged((user) => {
                if (user) {
                    firebase.database().ref('Employee/' + firebase.auth().currentUser.uid)
                        .on('value', snap => {
                            const myObj = snap.val()
                            commit('gotTest', myObj.Test)
                        })
                    commit('setUser', user)
                } else {
                    commit('setUser', null)
                }
            })
        },
        getUserData({ commit }) {
            firebase.database().ref('Employee/')
                .on('value', snap => {
                    const myObj = snap.val()
                    commit('gotUser', myObj)
                })
        },
        userIsAuthenticated() {
            return this.$store.getters.user !== null && this.$store.getters.user !== undefined
        },
        readJobs({ commit }) {
            return firebase.database().ref('Jobs')
                .on('value', snap => {
                    commit('emptyJobs')
                    const myObj = snap.val()
                    commit('gotJobs', myObj)
                }, function(error) {
                    console.log('Error: ' + error.message)
                })
        },
        readEmployer({ commit }) {
            return firebase.database().ref('Employer')
                .on('value', snap => {
                    commit('emptyEmployer')
                    const myObj = snap.val()
                    commit('gotEmployer', myObj)
                }, function(error) {
                    console.log('Error: ' + error.message)
                })
        },
        readRatings({ commit }) {
            return firebase.database().ref('Ratings')
                .on('value', snap => {
                    commit('emptyRating')
                    const myObj = snap.val()
                    // console.log(myObj)
                    commit('gotRating', myObj)
                }, function(error) {
                    console.log('Error: ' + error.message)
                })
        },
        setTestResult({ commit }, payload) {
            firebase.database().ref('Employee/' + this.state.user.uid).update({ Test: payload })
            commit('getTestResult', payload)
        }
    },
    getters: {
        user: state => state.user,
        userdetails: state => state.userdetails,
        jobs: state => state.jobs,
        employers: state => state.employers,
        ratings: state => state.ratings,
        test: state => state.test
    }
})
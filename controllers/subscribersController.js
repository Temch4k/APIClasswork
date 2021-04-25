"use strict";

const Subscriber = require("../models/subscriber");

module.exports={
    index: (req, res, next)=>{
        Subscriber.find()
        .then(subscribers=>{
            res.locals.subscribers = subscribers;
            next();
        })
        .catch(error=>{
            console.log(`Error fetching subscriber data: ${error.message}`);
            next(error);
        });
    },
    indexView: (req, res) =>{
        res.render("subscribers/index");
    },
    new: (req, res) =>{
        res.render("subscribers/new");
    },
    create: (req, res, next)=>{
        let newSubscriber = new Subscriber({
            name: req.body.name,
            email: req.body.email,
            zipCode: req.body.zipCode
        });
        Subscriber.create(newSubscriber)
        .then(subscriber => {
            res.locals.subscriber = subscriber;
            res.locals.redirect = "/subscribers";
            next();
        })
        .catch(error => {
            console.log(`Error saving user: ${error.message}`)
        });
    },
    redirectView: (req, res, next) =>{
        let redirectPath = res.locals.redirect;
        if(redirectPath != undefined) res.redirect(redirectPath);
        else next();
    },
    show: (req, res, next)=>{
        let subscriberid = req.params.id;
        Subscriber.findById(subscriberid)
        .then(subscriber=>{
            res.locals.subscriber = subscriber;
            next();
        })
        .catch(error=>{
            console.log(`Error fetching subscriber by ID: ${error.message}`);
        });
    },
    showView: (req, res) =>{
        res.render("subscribers/show");
    },
    edit: (req, res, next)=>{
        let subscriberId = req.params.id;
        Subscriber.findById(subscriberId)
        .then(subscriber=>{
            res.render("subscribers/edit", {subscriber: subscriber});
        })
        .catch(error=>{
            console.log(`Error fetching subscriber by ID: ${error.message}`);
            next(error);
        });
    },
    update: (req, res, next) => {
        let subscriberId = req.params.id;
        let updatedSubscriber = new Subscriber({
            name: req.body.name,
            email: req.body.email,
            zipCode: req.body.zipCode
        });
        Subscriber.findByIdAndUpdate(subscriberId,
            {
                name: req.body.name,
                email: req.body.email,
                zipCode: req.body.zipCode
            })
        .then(subscriber=>{
            res.locals.subscriber = subscriber;
            res.locals.redirect=`/subscribers/${subscriber._id}`;
            next();
        })
        .catch(error=>{
            console.log(`Error fetching subscriber by ID: ${error.message}`);
            next(error);
        });
    },
    delete: (req, res, next) =>{
        let subscriberId = req.params.id;
        Subscriber.findByIdAndRemove(subscriberId)
        .then(() =>{
            res.locals.redirect = "/subscribers";
            next();
        })
        .catch(error=>{
            console.log(`Error fetching subscriber by ID: ${error.message}`);
            next(error);
        });
    }
}
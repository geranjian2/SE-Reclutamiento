
import express = require('express');
import { createContainer, asClass, asValue } from "awilix";
import { scopePerRequest } from 'awilix-express';
import { Model } from 'mongoose';
import { AuthService,LeafLetService } from "../services/";
import { LeafletRepository, UserRepository } from '../repositorys';



export default (app: express.Application):void => {

    const container = createContainer({
        injectionMode: 'CLASSIC'
    });
    container.register({
        modelMongoose: asValue(Model),
    });
      
    
    /**
     * Registro de Repositorys para injección de dependencias
     */
    container.register({
        _userRepository:asClass(UserRepository).scoped(),
        _leafletRepository:asClass(LeafletRepository).scoped(),
    });
    

    /**
     * Registro de servicios para injección de dependencias
     */
    container.register({
        _authService:asClass(AuthService).scoped(),
        _leafLetService:asClass(LeafLetService).scoped(),
    });
    //asociar un nuevo coportamiento
    app.use(scopePerRequest(container));
    
};

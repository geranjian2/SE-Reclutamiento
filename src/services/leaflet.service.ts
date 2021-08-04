/* eslint-disable prefer-const */
import { LeafletRequestDto, LeafletResponseDto } from "../dtos/";
import { ILeaflet, IUser } from "../interfaces";
import { LeafletRepository } from "../repositorys/";

export enum LeafLetRegisterResult {
    Success = 'Success',
    EmailTaken = 'Email ya existe',
}

export class LeafLetService {
    constructor(private readonly _leafletRepository: LeafletRepository) { }
    
    public async getAll(): Promise<ILeaflet[]>{
        let leafLet = await this._leafletRepository.findAll();
        return leafLet;
    } 

    public async findById(id:string): Promise<ILeaflet | null> {
        try {
            let leafLet = await this._leafletRepository.findById(id);
            if(leafLet){
                return leafLet;
            }
                return null;
            
        } catch (error) {
            throw new Error(`Error register. ${error}`);
        }
    } 

    public async create(dto: LeafletRequestDto, user: IUser): Promise<LeafLetRegisterResult> {
        
        try {
            
            let leafLetEmail = await this._leafletRepository.findOne({email:dto.email});
            if(!leafLetEmail){
                let leafLet:ILeaflet;
                const model = this.dtoToModel(dto);
                model.user = new IUser({
                    _id: user._id
                });
                leafLet = await this._leafletRepository.create(model);
                return LeafLetRegisterResult.Success;
            }
            return LeafLetRegisterResult.EmailTaken;
        } catch (error) {
            throw new Error(`Error register. ${error}`);
        }

    }


    protected dtoToModel(dto: LeafletRequestDto): ILeaflet {

        return new ILeaflet({
            name: dto.name,
            lastName: dto.lastName,
            email:dto.email,
            document:dto.document,
            vacancyName:dto.vacancyName,
            customerName:dto.customerName,
            phone:dto.phone,
            experience:dto.experience,
            academicLevel:dto.academicLevel,
            city:dto.city
        });
    }
}
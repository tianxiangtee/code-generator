import { getModelToken } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import { Model } from 'mongoose';
import { Car, CarDocument } from './entities/car.entity';
import { CarService } from './car.service';

describe('CarService', () => {
  let carService: CarService;
  let carModel: Model<CarDocument>;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        CarService,
        {
          provide: getModelToken(Car.name),
          useValue: {
            find: jest.fn(),
            create: jest.fn(),
            findByIdAndUpdate: jest.fn(),
            findByIdAndDelete: jest.fn(),
          },
        },
        {
          provide: getModelToken('CarAudit'),
          useValue: {
            find: jest.fn(),
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    carService = moduleRef.get<CarService>(CarService);
    carModel = moduleRef.get<Model<CarDocument>>(getModelToken(Car.name));
  });

  describe('findAll', () => {
    it('should return an array of cars', async () => {
      const result = [
        { id: '1', name: 'Car 1' },
        { id: '2', name: 'Car 2' },
      ];
      jest.spyOn(carModel, 'find').mockReturnValueOnce({
        lean: jest.fn().mockReturnValueOnce(result),
        exec: jest.fn().mockResolvedValueOnce(result),
      } as any);
      const filters = {};
      const cars = await carService.findAll();
      expect(cars).toEqual(result);
    });
  });

  // Add more test cases for other methods in CarService
});

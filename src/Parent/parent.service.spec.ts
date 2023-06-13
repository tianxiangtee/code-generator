import { getModelToken } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import { Model } from 'mongoose';
import {
  Parent,
  ParentDocument,
} from './entities/parent.entity';
import { ParentService } from './parent.service';

describe('ParentService', () => {
  let parentService: ParentService;
  let ParentModel: Model<ParentDocument>;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        ParentService,
        {
          provide: getModelToken(Parent.name),
          useValue: {
            find: jest.fn(),
            create: jest.fn(),
            findByIdAndUpdate: jest.fn(),
            findByIdAndDelete: jest.fn(),
          },
        },
        {
          provide: getModelToken('ParentAudit'),
          useValue: {
            find: jest.fn(),
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    parentService = moduleRef.get<ParentService>(
      ParentService,
    );
    ParentModel = moduleRef.get<Model<ParentDocument>>(
      getModelToken(Parent.name),
    );
  });

  describe('findAll', () => {
    it('should return an array of parents', async () => {
      const result = [
        { id: '1', name: 'Parent 1' },
        { id: '2', name: 'Parent 2' },
      ];
      jest.spyOn(ParentModel, 'find').mockReturnValueOnce({
        lean: jest.fn().mockReturnValueOnce(result),
        exec: jest.fn().mockResolvedValueOnce(result),
      } as any);
      const filters = {};
      const parents = await parentService.findAll();
      expect(parents).toEqual(result);
    });
  });

  // Add more test cases for other methods in ParentService
});

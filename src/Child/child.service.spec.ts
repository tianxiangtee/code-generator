import { getModelToken } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import { Model } from 'mongoose';
import {
  Child,
  ChildDocument,
} from './entities/child.entity';
import { ChildService } from './child.service';
import { ParentService } from '../Parent/parent.service';
import { ParentModule } from '../Parent/parent.module';

describe('ChildService', () => {
  let childService: ChildService;
  let parentService: ParentService;
  let ChildModel: Model<ChildDocument>;
  const mockParentService = {
    createAudit: jest.fn(),
    updateChildCountAndValidate: jest.fn(),
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        ChildService,
        {
          provide: ParentService,
          useValue: mockParentService,
        },
        {
          provide: getModelToken(Child.name),
          useValue: {
            find: jest.fn(),
            create: jest.fn(),
            findByIdAndUpdate: jest.fn(),
            findByIdAndDelete: jest.fn(),
          },
        },
        {
          provide: getModelToken('ChildAudit'),
          useValue: {
            find: jest.fn(),
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    childService = moduleRef.get<ChildService>(
      ChildService,
    );
    parentService = moduleRef.get(ParentService)
    ChildModel = moduleRef.get<Model<ChildDocument>>(
      getModelToken(Child.name),
    );
  });

  describe('findAll', () => {
    it('should return an array of childs', async () => {
      const result = [
        { id: '1', name: 'Child 1' },
        { id: '2', name: 'Child 2' },
      ];
      jest.spyOn(ChildModel, 'find').mockReturnValueOnce({
        lean: jest.fn().mockReturnValueOnce(result),
        exec: jest.fn().mockResolvedValueOnce(result),
      } as any);
      const filters = {};
      const childs = await childService.findAll();
      expect(childs).toEqual(result);
    });
  });

  // Add more test cases for other methods in ChildService
});

import { getModelToken } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import { Model } from 'mongoose';
import {
  TemplatePascal,
  TemplatePascalDocument,
} from './entities/template-kebab-case.entity';
import { TemplatePascalService } from './template-kebab-case.service';

describe('TemplatePascalService', () => {
  let templateCamelCaseService: TemplatePascalService;
  let TemplatePascalModel: Model<TemplatePascalDocument>;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        TemplatePascalService,
        {
          provide: getModelToken(TemplatePascal.name),
          useValue: {
            find: jest.fn(),
            create: jest.fn(),
            findByIdAndUpdate: jest.fn(),
            findByIdAndDelete: jest.fn(),
          },
        },
        {
          provide: getModelToken('TemplatePascalAudit'),
          useValue: {
            find: jest.fn(),
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    templateCamelCaseService = moduleRef.get<TemplatePascalService>(
      TemplatePascalService,
    );
    TemplatePascalModel = moduleRef.get<Model<TemplatePascalDocument>>(
      getModelToken(TemplatePascal.name),
    );
  });

  describe('findAll', () => {
    it('should return an array of templateCamelCases', async () => {
      const result = [
        { id: '1', name: 'TemplatePascal 1' },
        { id: '2', name: 'TemplatePascal 2' },
      ];
      jest.spyOn(TemplatePascalModel, 'find').mockReturnValueOnce({
        lean: jest.fn().mockReturnValueOnce(result),
        exec: jest.fn().mockResolvedValueOnce(result),
      } as any);
      const filters = {};
      const templateCamelCases = await templateCamelCaseService.findAll();
      expect(templateCamelCases).toEqual(result);
    });
  });

  // Add more test cases for other methods in TemplatePascalService
});

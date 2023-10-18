import { getModelToken } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import { Model } from 'mongoose';
import { Template, TemplateDocument } from './entities/template.entity';
import { TemplateService } from './template.service';

describe('TemplateService', () => {
  let templateService: TemplateService;
  let templateModel: Model<TemplateDocument>;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        TemplateService,
        {
          provide: getModelToken(Template.name),
          useValue: {
            find: jest.fn(),
            create: jest.fn(),
            findByIdAndUpdate: jest.fn(),
            findByIdAndDelete: jest.fn(),
          },
        },
        {
          provide: getModelToken('TemplateAudit'),
          useValue: {
            find: jest.fn(),
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    templateService = moduleRef.get<TemplateService>(TemplateService);
    templateModel = moduleRef.get<Model<TemplateDocument>>(
      getModelToken(Template.name),
    );
  });

  describe('findAll', () => {
    it('should return an array of templates', async () => {
      const result = [
        { id: '1', name: 'Template 1' },
        { id: '2', name: 'Template 2' },
      ];
      jest.spyOn(templateModel, 'find').mockReturnValueOnce({
        lean: jest.fn().mockReturnValueOnce(result),
        exec: jest.fn().mockResolvedValueOnce(result),
      } as any);
      const filters = {};
      const templates = await templateService.findAll();
      expect(templates).toEqual(result);
    });
  });

  // Add more test cases for other methods in TemplateService
});

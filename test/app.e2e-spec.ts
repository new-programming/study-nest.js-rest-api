import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  // beforeEach => beforeALL
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true, // 変なことの場合、request自体を防ぐ
      transform: true, // type変更
    }));
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Welcome to my Movie API');
  });

  describe("/movies", ()=>{
    it("GET", ()=>{
      return request(app.getHttpServer())
      .get("/movies")
      .expect(200)
      .expect([]);  
    })
    it("POST 201", ()=>{
      return request(app.getHttpServer())
      .post("/movies")
      .send({
        title:"Test",
        year:2000,
        genres:["test"]
      })
      .expect(201)
    })
    it("POST 400", ()=>{
      return request(app.getHttpServer())
      .post("/movies")
      .send({
        title:"Test",
        year:2000,
        genres:["test"],
        other: "thing",
      })
      .expect(400)
    })
    it("DELETE", ()=>{
      return request(app.getHttpServer())
      .delete("/movies")
      .expect(404)
    })
  })
  describe("/movies/:id", ()=>{
    it("GET 200", ()=>{
      return request(app.getHttpServer())
      .get("/movies/1")
      .expect(200);
    });
    it("GET 404", ()=>{
      return request(app.getHttpServer())
      .get("/movies/999")
      .expect(404);
    });
    it("PATCH", ()=>{
      return request(app.getHttpServer())
      .patch("/movies/1")
      .send({title: "Updated Test"})
      .expect(200);
    });
    it("DELETE", ()=>{
      return request(app.getHttpServer())
      .delete("/movies/1")
      .expect(200);
    });
  })
});
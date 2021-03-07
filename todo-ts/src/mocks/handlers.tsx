import { rest } from "msw";

const baseUrl = 'http://localhost:3000';

export const handlers = [
  
  rest.get(`${baseUrl}/todo`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          "id": 1,
          "title": "はじめにやるやつ",
          "done": true
        },
        {
          "id": 2,
          "title": "次にやるやつ",
          "done": false
        }
      ]),
    );
  }),

  rest.post(`${baseUrl}/todo`, (req, res, ctx) => {
    return res(
      ctx.status(201, 'Created'),
      ctx.json(req.body)
    );
  }),

  rest.put(`${baseUrl}/todo/:id`, (req, res, ctx) => {
    return res(
      ctx.status(200, 'OK'),
      ctx.json(req.body)
    );
  }),

  rest.delete(`${baseUrl}/todo/:id`, (_, res, ctx) => {
    return res(
      ctx.status(200, 'OK'),
      ctx.json({})
    );
  }),

  // fallback request handler
  rest.get('*', (req, res, ctx) => {
    console.error(`Error GET Handler: ${req.url}`)
    return res(ctx.status(500));
  }),
  rest.post('*', (req, res, ctx) => {
    console.error(`Error POST Handler: ${req.url}`)
    return res(ctx.status(500));
  }),
  rest.put('*', (req, res, ctx) => {
    console.error(`Error PUT Handler: ${req.url}`)
    return res(ctx.status(500));
  }),
  rest.delete('*', (req, res, ctx) => {
    console.error(`Error DELETE Handler: ${req.url}`)
    return res(ctx.status(500));
  }),

];

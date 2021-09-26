import { Response } from './type/Response';
import request from '../utils/request'
import { Painting } from './type/Painting';

export function getPaintingDetailById(id: string): Promise<Response<Painting>>{
  return <Promise<any>> request({
    url: `api/img/painting/detail/` + id,
    method: `get`
  })
}


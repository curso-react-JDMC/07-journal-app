import { fileUpload } from "../../helpers/fileUpload";
import 'setimmediate';
import cloudinary from 'cloudinary';

cloudinary.config({ 
    cloud_name: 'dywx9kw9w', 
    api_key: '145185922142598', 
    api_secret: 'F-Y74ho5MG4eLmyZt72Cn1vZiWg',
    secure: true
  });


describe('pruebas en file upload', () => { 

    test('debe cargar un archivo y retornar una url', async () => { 
        const imgResp = await fetch('https://cdn.pixabay.com/photo/2021/08/25/20/42/field-6574455__480.jpg');
        const blob = await imgResp.blob();

        const file = new File([blob],'foto.png');
        const url = await fileUpload(file);
        expect(typeof url).toBe('string');

        const segments = url.split('/');
        const imageId = segments[segments.length - 1].replace('.jpg','');
        await cloudinary.v2.api.delete_resources(imageId,{},(error,result)=>{
            //console.log(error,result);
            //done();
        });
    })
    
    test('debe retornar un', async () => { 

        const file = new File([],'foto.png');
        const url = await fileUpload(file);
        expect(url).toBe(null);
    })
    
})
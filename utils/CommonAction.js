class CommonAction{
    static async setViewport(page){
        const devices = [
            {name: 'Desktop', viewport: {width: 1920, height: 1080}},
            {name: 'Tablet', viewport: {width: 768, height: 1024}},
            {name: 'Mobile', viewport: {width:360, height: 640}}
            ];
        for(const device of devices){
            await page.setViewportsize(device.viewport);
        }
    }
}
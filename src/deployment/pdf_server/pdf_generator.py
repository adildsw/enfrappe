#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Thu Mar 24 22:54:42 2022

@author: anishagupta
"""

from img_data import get_images
from PIL import Image, ImageDraw, ImageFont
from binascii import a2b_base64
import os
import shutil

def get_pngs(base64_imgs):
    imgs = []
    if os.path.exists('temp'):
        shutil.rmtree('temp')
    os.mkdir('temp')
    
    for i,b64 in enumerate(base64_imgs):
        b64 = b64.replace("data:image/png;base64,", "")
        b64 = b64 + "=="
        binary_data = a2b_base64(b64)
        fd = open('temp/test'+str(i)+'.png', 'wb')
        fd.write(binary_data)
        fd.close()
        img = Image.open('temp/test'+str(i)+'.png')
        print(img.size)
        img = img.resize((992, 992))
        imgs.append(img)
        
    return imgs

def create_page(imgs, img_numbers, page, app_name="Untitled"):
    a4_template = Image.open('frappe_letterhead.png') 
    font = ImageFont.truetype(r'fonts/Roboto/Roboto-Thin.ttf', 100)
    num_font = ImageFont.truetype(r'fonts/Roboto/Roboto-Bold.ttf', 40)
    draw = ImageDraw.Draw(a4_template)
    text_w, text_h = draw.textsize(app_name, font=font)
    num_w, num_h = draw.textsize("1", font=num_font)
    
    if len(imgs) == 1:
        x = (a4_template.width-imgs[0].width)//2 
        y = (a4_template.height-imgs[0].height)//2 - 300
        a4_template.paste(imgs[0], (x, y)) # center image
        text_h = (a4_template.height-imgs[0].height)//2 - 200 + imgs[0].height
        draw.text(((a4_template.width-text_w)//2, text_h),
                  app_name, fill='black', font=font)
        if page != 0: # first page
            num_w += (a4_template.width-imgs[0].width)//2 + 10
            num_h = (a4_template.height-imgs[0].height)//2 - 300 - num_h
            draw.text((num_w, num_h),
                      img_numbers[0], fill='black', font=num_font)
    elif len(imgs) == 2:
        x1 = (a4_template.width-imgs[0].width)//8 
        y1 = (a4_template.height-imgs[0].height)//2 - 300
        a4_template.paste(imgs[0], (x1, y1)) # left image
        
        num_w1 = (a4_template.width-imgs[0].width)//8 + 10 + num_w
        num_h1 = (a4_template.height-imgs[0].height)//2 - 300 - num_h
        draw.text((num_w1, num_h1),
                  img_numbers[0], fill='black', font=num_font)
        
        x2 = a4_template.width-imgs[1].width- (a4_template.width-imgs[1].width)//8
        y2 = (a4_template.height-imgs[1].height)//2 - 300
        a4_template.paste(imgs[1], (x2, y2)) # right image
        text_h = (a4_template.height-imgs[0].height)//2 - 200 + imgs[0].height
        
        num_w2 = num_w + a4_template.width-imgs[1].width- (a4_template.width-imgs[1].width)//8 + 10
        num_h2 = (a4_template.height-imgs[0].height)//2 - 300 - num_h
        draw.text((num_w2, num_h2),
                  img_numbers[1], fill='black', font=num_font)
        
        draw.text(((a4_template.width-text_w)//2, text_h),
                  app_name, fill='black', font=font)
    elif len(imgs) == 3:
        x1 = (a4_template.width-imgs[0].width)//2
        y1 = (a4_template.height-imgs[0].height)//2 - imgs[0].height//2 - 300
        a4_template.paste(imgs[0], (x1, y1)) # top center image
        
        num_w1 = (a4_template.width-imgs[0].width)//2 + 10 + num_w
        num_h1 = (a4_template.height-imgs[0].height)//2 - imgs[0].height//2 - 300 - num_h
        draw.text((num_w1, num_h1),
                  img_numbers[0], fill='black', font=num_font)
        
        x2 = (a4_template.width-imgs[1].width)//8
        y2 = (a4_template.height-imgs[1].height)//2 + imgs[1].height//2 - 200
        a4_template.paste(imgs[1], (x2, y2)) # bottom left image
        
        num_w2 = num_w + (a4_template.width-imgs[1].width)//8 + 10
        num_h2 = (a4_template.height-imgs[1].height)//2 + imgs[1].height//2 - 200 - num_h
        draw.text((num_w2, num_h2),
                  img_numbers[1], fill='black', font=num_font)
        
        x3 = a4_template.width-imgs[1].width - (a4_template.width-imgs[1].width)//8
        y3 = (a4_template.height-imgs[2].height)//2 + imgs[2].height//2 - 200
        a4_template.paste(imgs[2], (x3, y3)) # bottom right image
        
        num_w3 = num_w + a4_template.width-imgs[1].width- (a4_template.width-imgs[1].width)//8 + 10
        num_h3 = (a4_template.height-imgs[0].height)//2 + imgs[2].height//2 - 200 - num_h
        draw.text((num_w3, num_h3),
                  img_numbers[2], fill='black', font=num_font)
        
        text_h = (a4_template.height-imgs[0].height)//2 - 100 + imgs[0].height*3//2
        draw.text(((a4_template.width-text_w)//2, text_h),
                  app_name, fill='black', font=font)
    elif len(imgs) == 4:
        x1 = (a4_template.width-imgs[0].width)//8
        y1 = (a4_template.height-imgs[0].height)//2 - imgs[0].height//2 - 300
        a4_template.paste(imgs[0], (x1, y1)) # top left image
        
        num_w1 = num_w + (a4_template.width-imgs[1].width)//8 + 10
        num_h1 = (a4_template.height-imgs[0].height)//2 - imgs[0].height//2 - 300 - num_h
        draw.text((num_w1, num_h1),
                  img_numbers[0], fill='black', font=num_font)
        
        x2 = a4_template.width-imgs[1].width-(a4_template.width-imgs[1].width)//8
        y2 = (a4_template.height-imgs[1].height)//2 - imgs[1].height//2 - 300
        a4_template.paste(imgs[1], (x2, y2)) # top right image
        
        num_w2 = num_w + a4_template.width-imgs[1].width- (a4_template.width-imgs[1].width)//8 + 10
        num_h2 = (a4_template.height-imgs[0].height)//2 - imgs[1].height//2 - 300 - num_h
        draw.text((num_w2, num_h2),
                  img_numbers[1], fill='black', font=num_font)
        
        x3 = (a4_template.width-imgs[2].width)//8
        y3 = (a4_template.height-imgs[2].height)//2 + imgs[2].height//2 - 200
        a4_template.paste(imgs[2], (x3, y3)) # bottom left image
        
        num_w3 = num_w + (a4_template.width-imgs[2].width)//8 + 10
        num_h3 = (a4_template.height-imgs[2].height)//2 + imgs[2].height//2 - 200 - num_h
        draw.text((num_w3, num_h3),
                  img_numbers[2], fill='black', font=num_font)
        
        x4 = a4_template.width-imgs[3].width-(a4_template.width-imgs[3].width)//8
        y4 = (a4_template.height-imgs[3].height)//2 + imgs[3].height//2 - 200
        a4_template.paste(imgs[2], (x4, y4)) # bottom right image
        
        num_w4 = num_w + a4_template.width-imgs[3].width-(a4_template.width-imgs[3].width)//8 + 10
        num_h4 = (a4_template.height-imgs[3].height)//2 + imgs[3].height//2 - 200 - num_h
        draw.text((num_w4, num_h4),
                  img_numbers[3], fill='black', font=num_font)
        
        text_h = (a4_template.height-imgs[0].height)//2 - 100 + imgs[0].height*3//2
        draw.text(((a4_template.width-text_w)//2, text_h),
                  app_name, fill='black', font=font)
    
    return a4_template

def create_pdf(base64_imgs, app_name="Untitled"):
    imgs = get_pngs(base64_imgs)
    limit = 4
    imgs_per_page = [imgs[i:i+4] for i in range(0, len(imgs), limit)]
    image_list = []
    num_per_page = [[str(i+diff+1) for diff in range(limit) if i+diff < len(imgs)] 
                    for i in range(0, len(imgs), limit)]
    for pg, page in enumerate(imgs_per_page):
        image_list.append(create_page(page, num_per_page[pg], pg,
                                      app_name=app_name))
    
    image_list[0].save('output.pdf', save_all=True, 
                       append_images=image_list[1:len(image_list)])

if __name__ == "__main__":
    create_pdf(get_images(6))
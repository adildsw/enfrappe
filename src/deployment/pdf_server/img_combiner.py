#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Tue Mar 22 16:13:36 2022

@author: anishagupta
"""
import os
import cv2
import numpy as np

def get_images():
    images = []
    image_idx = []
    idx = 1
    max_size = 0
    
    for filename in sorted(os.listdir(), reverse=True):
        if filename.endswith('.png'):
            img = cv2.imread(filename, cv2.IMREAD_GRAYSCALE)
            if max_size < img.shape[0]:
                max_size = img.shape[0]
            images.append(img)
            image_idx.append(idx)
            idx += 1
            
    images = [cv2.resize(img, (max_size, max_size), 
              interpolation=cv2.INTER_AREA) for img in images]
            
    image_idx = [len(image_idx) - i + 1 for i in image_idx]
    
    return images, image_idx

def resize_with_padding(img, dim):
    delta_w = dim[0] - img.shape[1]
    top, bottom = 10, 10
    left, right = delta_w//2, delta_w-(delta_w//2)
    
    color = [255,255,255]
    new_im = cv2.copyMakeBorder(img, top, bottom, left, right, 
                                cv2.BORDER_CONSTANT, value=color)
    
    return new_im

def add_uniform_padding(img, dim, only_bottom=False):
    top, bottom = dim, dim
    left, right = dim, dim
    
    if only_bottom:
        top, left, right = 0, 0, 0
    
    color = [255,255,255]
    new_im = cv2.copyMakeBorder(img, top, bottom, left, right, 
                                cv2.BORDER_CONSTANT, value=color)
    
    return new_im

def number_image(image, number):
    font = cv2.FONT_HERSHEY_DUPLEX
    fontScale = 0.7
    color = (0,0,0)
    thickness = 2
    
    image = add_uniform_padding(image, 10, only_bottom=True)
    org = (image.shape[1]//2,image.shape[0]-8)
    image = cv2.putText(image, str(number), 
                            org, font, fontScale, color, 
                            thickness, cv2.LINE_AA)
        
    return image

def label_image(image, label):
    font = cv2.FONT_HERSHEY_DUPLEX
    fontScale = 1
    color = (0,0,0)
    thickness = 3
    
    image = add_uniform_padding(image, 40, only_bottom=True)
    org = (image.shape[1]//2-len(label)*8,image.shape[0]-8)
    image = cv2.putText(image, label, 
                            org, font, fontScale, color, 
                            thickness, cv2.LINE_AA)
        
    return image

def merge_images(images, image_idx, size=None, single_img=True):
    if len(images) == 0:
        return None
    if len(images) == 1:
        if size != None:
            return number_image(resize_with_padding(images[0], (size*2, size*2)),
                                image_idx[0])
        else:
            if not single_img:
                return number_image(images[0], image_idx[0])
            return images[0]
    if len(images) == 2:
        if size == None:
            size = max(images[0].shape[0], images[1].shape[0])
        img1 = number_image(cv2.resize(images[0], (size, size), 
                            interpolation=cv2.INTER_AREA), image_idx[0])
        img2 = number_image(cv2.resize(images[1], (size, size), 
                            interpolation=cv2.INTER_AREA), image_idx[1])
        return np.concatenate((img2, img1), axis=1)
    
    if size == None:
        size = max(images[len(images)-1].shape[0], 
                   images[len(images)-2].shape[0])
    else:
        size = max(images[len(images)-1].shape[0], 
                   images[len(images)-2].shape[0], size)
    img1 = merge_images(images[0:len(images)-2], 
                        image_idx[0:len(images)-2], size)
    img2 = merge_images(images[len(images)-2:len(images)],
                        image_idx[len(images)-2:len(images)], size)
   
    return np.concatenate((img2, img1), axis=0)

def create_pages(app_name="AppName", limit=6):
    images, image_idx = get_images()
    images_per_page = [images[max(0,i-limit):i] for i in range(len(images), 0, -limit)]
    idx_per_page = [image_idx[max(0,i-limit):i] for i in range(len(image_idx), 0, -limit)]
    single_img = True
    if len(images) > 1:
        single_img = False
    print(idx_per_page)
    
    for page_num in range(len(images_per_page)):
        merged_image = merge_images(images_per_page[page_num], 
                                    idx_per_page[page_num], single_img=single_img)
        merged_image = label_image(merged_image, app_name)
        cv2.imwrite("Outputs/page"+str(page_num)+".png", 
                    merged_image)
        
create_pages(limit=3)
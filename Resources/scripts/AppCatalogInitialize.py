

#!/usr/bin/env python
from BeautifulSoup import BeautifulSoup
from urlparse import urljoin
import requests
import json

appc = None

ACS_BASE_URI = 'http://api.cloud.appcelerator.com/v1/'

class acs(object):
    def __init__(self, key, username, password):
        self.key = key
        self.username = username
        self.password = password
        self.cookies = {}
    
    def users(self, method):
        http_method = 'GET'
        if method == 'login':
            
            uri = urljoin(ACS_BASE_URI, 'users/login.json')
            http_method = 'POST'
            args = {'key': self.key, 'login': self.username, 'password':
                    self.password}
            r = self._call(http_method, uri, args)
            
            #print 'yack yack'
            if r.status_code == 200:
                   self.cookies = r.cookies
            else:
                raise Exception('invalid status code: ' + str(r.status_code) )
        elif method == 'create':
            uri = urljoin(ACS_BASE_URI, 'users/create.json')
            http_method = 'POST'
        else:
            raise Exception('method not supported')
        return r
    
    def objects(self, method, args):
        http_method = 'GET'
        if method == 'show':
            pass
        elif method == 'query':
            uri = urljoin(ACS_BASE_URI, 'objects/' + args['class_name'] +
            '/query.json')
            params = {'key': self.key}
            r = self._call(http_method, uri, params)
            if r.status_code == 200:
                return json.loads(r.text)['response'][args['class_name']]
        elif method == 'create':
            http_method = 'POST'
            uri = urljoin(ACS_BASE_URI, 'objects/' + args['class_name'] +
            '/create.json')
            params = {'key': self.key, 'fields': json.dumps(args['fields'])}
            r = self._call(http_method, uri, params)
        else:
            raise Exception('method not supported')
        if r.status_code == 200:
            return r 
        else:
            raise Exception('invalid response code')
    
    def _call(self, method, path, args):
        if method == 'GET':
            r = requests.get(path, params=args, cookies=self.cookies)
        elif method == 'POST':
            r = requests.post(path, params=args, cookies=self.cookies)
        elif method == 'PUT':
            r = requests.put(path, params=args, cookies=self.cookies)
        elif method == 'DELETE':
            r = requests.delete(path, params=args, cookies=self.cookies)
        else:
            raise Exception('invalid method')
        return r

def upload_data(fields, class_name):
    global appc
    print 'Uploading ' + fields['name'] + ' App'
    appc.objects('create', {'class_name': class_name, 'fields': fields})    

if __name__ == '__main__':
    
	# Login to ACS
    appc = acs(key='XXX', username='xx', password='xx')
    appc.users('login')
	
    print 'stock some apps in our catalog'
	
    record = {
        'name': "Scoutmob",
        'description': "",
        'itunesIcon': 'http://a5.mzstatic.com/us/r1000/116/Purple/v4/44/a2/19/44a2192f-723d-f9e7-1fde-32e320077340/mzl.xhgchuaf.175x175-75.jpg',
        'itunesURL':'http://itunes.apple.com/us/app/scoutmob/id346700012?mt=8'
    }
    upload_data(record, 'apps')
    
    record = {
        'name': 'Five Guys Burgers & Fries',
        'description': 'Skip the line! Find the closest Five Guys Burgers & Fries restaurant, place your order, and pick up your food today.1) Launch the app and',
        'itunesIcon': 'http://a4.mzstatic.com/us/r1000/064/Purple/6c/51/26/mzl.feepoudb.175x175-75.jpg',
        'itunesURL':'http://itunes.apple.com/us/app/five-guys-burgers-fries/id457494327?mt=8'
    }
    upload_data(record, 'apps')
    
    record = {
        'name': 'HipSwap',
        'description': 'Shop your neighborhood. We deliver. HipSwap connects buyers and sellers locally. Snap a photo or record a video. It\'s that easy.Features- Selling an item is as easy as taking a photo or recording a video.- Buy locally: browse all the stuff near you and buy with one tap',
        'itunesIcon': 'http://a4.mzstatic.com/us/r1000/067/Purple/f9/99/f9/mzl.cxluusnt.175x175-75.jpg',
        'itunesURL':'http://itunes.apple.com/us/app/hipswap/id462519589?ls=1&mt=8'
    }
    upload_data(record, 'apps')
    
    record = {
        'name': "Spinning Meals Smart Meal Planner",
        'description': "An automatic meal planner with internet recipe capture, plus recipes so you can start right away, Spinning Meals is a game-changer for the family table!Spinning Meals is the only iPhone app that automatically plans your meal schedule",
        'itunesIcon': "http://a1.mzstatic.com/us/r1000/101/Purple/v4/27/6a/d3/276ad36c-a132-3ad3-0d2b-f2273899091e/mza_6915810832393530717.175x175-75.jpg",
        'itunesURL':"http://itunes.apple.com/us/app/spinning-meals-smart-meal/id490381541?mt=8"
    }
    upload_data(record, 'apps')

    

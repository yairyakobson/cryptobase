# Deployment Instructions

### 1. Open a new terminal in the directory of your private key (pem file) and copy the following command:
<h4>ssh -i "cryptobasekey.pem" ubuntu@ec2-51-17-2-172.il-central-1.compute.amazonaws.com</h4>
<br/>
Note: If it’s your first time doing this, a message will appear in your terminal saying:
<h4>The authenticity of host 'ec2-51-17-2-172.il-central-1.compute.amazonaws.com (51-17-2-172)' can't be established.
ED25519 key fingerprint is cryptobasekey.pem.
This key is not known by any other names
Are you sure you want to continue connecting (yes/no/[fingerprint])?</h4>

<h4>Simply write yes.</h4>

<h2>Now your terminal runs the AWS instance.</h2>


### 2. Run the necessary commands based on your application and chosen AMI.
<br/>

# Deployment Commands (By Order)

<h3>1. sudo apt-get update: get the latest versions of the packages of your AMI.</h3>

<h3>2. sudo apt install npm: install the npm package in your instance.</h3>

<h3>3. curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash: installs nvm (node version manager)</h3>

<strong>Note: It’s possible for the node version in your local machine and the instance to be different. To check the version installed in your instance run the node -v command.</strong>

<h3>4. source ~/.bashrc: re-runs the .bashrc file, a script file executed whenever a new terminal session is started in an interactive shell (like bash).</h3>

<h3>5. nvm install <nodejs-version>: install the nodejs version you want.</h3>

<h3>6. nvm use <nodejs-version>: use the installed version of NodeJS.</h3>

<strong>Note: If you’re not sure the NodeJS version was installed correctly, run the node -v command.</strong>

<h3>7. git clone https://github.com/yairyakobson/cryptobase.git : clones the git repository from github.</h3>

<h3>8. ls: displays the name of the cloned repository(ies).</h3>

<h3>9. cd cryptobase: change the directory to that of the cloned repository.</h3>

<h2>Note: before running the server run npm i to install all the backend libraries to the instance.</h3></h2>

<h3>10. touch .env: creates a .env file.</h3>

<h3>11. nano .env: opens the .env file in a nano terminal.</h3>

<strong>Note: copy all the content from your .env file to the terminal and after you finished, press ctrl+x (cmd+x in mac) to exit, ctrl+y (cmd+y in mac) will display a message if you want to save or not. Choose yes and press enter to return to your regular terminal.</strong>

<h3>12. npm run server: runs the backend server.</h3>

# To run the client copy the connection key, run the cd cryptobase command and run the following commands:

### 1. npm install -g serve: installs the serve package globally.

### 2. serve -s build: runs our built project.</h3>

# Extra Commands:
<h3>1. git pull origin main: Fetches the latest code from the repository based on the directory.</h3>

<h3>2. cat filename.ext: fetches the content of a file.</h3>

<h3>3. rm -rf cryptobase: disconnects your repository from the EC2 instance.</h3>

### Note: After running this command, you’ll have to start the process of connecting your repository all over again.

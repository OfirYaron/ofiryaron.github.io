[_metadata_:author]:- "Ofir Yaron"
[_metadata_:title]:- "Automate EFS Creation with Bash Scripting"
[_metadata_:tags]:- "efs,bash,aws,file-system,tutorial"
[_metadata_:date]:- "16/4/2023"

Amazon Elastic File System (EFS) is a scalable, highly available, and secure file system designed to provide shared access to data across multiple instances in the cloud. In this tutorial, I'll show you how to create a new EFS drive and all its required assets using a bash script so that it can be connected to a predefined EC2 machine.

Prerequisites:
* AWS CLI installed and configured with proper credentials
* EC2 machine and VPC in place
<br />

### Step 1: Set Variables
First, we'll set the variables we need to run the script. Replace **REGION**, **EC2_NAME**, and **EFS_NAME** with your desired values.

```
REGION=eu-central-1
EC2_NAME=MY_MACHINE
EFS_NAME=my_shared_efs_drive
```
<br />

### Step 2: Get EC2 Instance ID
Using the AWS CLI, we'll get the EC2 instance ID by EC2 instance name:

```
EC2ID=$(aws ec2 describe-instances --filters "Name=tag:Name,Values=$EC2_NAME" \
--query 'Reservations[*].Instances[*].{ID:InstanceId}' \
--output text \
--region $REGION)
echo EC2 instance ID: $EC2ID
```
<br />

### Step 3: Get VPC and Subnet IDs
Next, we'll get the VPC and subnet IDs for the EC2 instance:

```
VPCID=$(aws ec2 describe-instances --instance-ids $EC2ID \
--query 'Reservations[*].Instances[*].{VPC:VpcId}' \
--output text \
--region $REGION)
echo VPC ID: $VPCID

SUBNETID=$(aws ec2 describe-instances --instance-ids $EC2ID \
--query 'Reservations[*].Instances[*].{Subnet:SubnetId}' \
--output text \
--region $REGION)
echo Subnet ID: $SUBNETID
```
<br />

### Step 4: Create Security Groups
We'll create two security groups - one for the EC2 instance and one for the mount target - and allow ingress traffic for each:

```
EC2_SGID=$(aws ec2 create-security-group \
--region $REGION \
--group-name efs-ec2-sg \
--description "Amazon EFS SG for EC2 instance" \
--vpc-id $VPCID \
--query 'GroupId' \
--output text)
echo EC2 SG ID: $EC2_SGID

MT_SGID=$(aws ec2 create-security-group \
--region $REGION \
--group-name efs-mt-sg \
--description "Amazon EFS SG for mount target" \
--vpc-id $VPCID \
--query 'GroupId' \
--output text)
echo Mount Target SG ID: $MT_SGID

aws ec2 authorize-security-group-ingress \
--group-id $EC2_SGID \
--protocol tcp \
--port 22 \
--cidr 0.0.0.0/0 \
--region $REGION

aws ec2 authorize-security-group-ingress \
--group-id $MT_SGID \
--protocol tcp \
--port 2049 \
--source-group $EC2_SGID \
--region $REGION
```
<br />

### Step 5: Create EFS Drive
Now we can create the EFS drive using the following command:

```
FSID=$(aws efs create-file-system \
--encrypted \
--creation-token $EFS_NAME \
--tags Key=Name,Value=$EFS_NAME \
--region
```
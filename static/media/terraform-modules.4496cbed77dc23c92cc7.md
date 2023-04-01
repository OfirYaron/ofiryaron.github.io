[_metadata_:author]:- "Ofir Yaron"
[_metadata_:title]:- "Terraform Modules"
[_metadata_:tags]:- "terraform,iac,modules"
[_metadata_:date]:- "21/2/2023"

# Terraform Modules

A Terraform module is a reusable piece of Terraform code that encapsulates a set of related resources and their configuration. Modules can be used to create, modify, and delete resources as a single unit, making it easy to manage complex infrastructure components. Modules can also be shared across different projects, making it easy to reuse code and standardize resource configurations across different environments.

A module consists of a directory containing one or more Terraform configuration files. The directory can also contain other files, such as variables, outputs, and scripts. A module can be published to a public or private registry or stored locally.

Here is an example of how to create a Terraform module that creates an Amazon Elastic Container Service (ECS) cluster in an AWS infrastructure as code project:

<code language="terraform">
provider "aws" {
  region = var.region
}

resource "aws_ecs_cluster" "cluster" {
  name = var.name
}

variable "region" {
  type    = string
  default = "us-west-2"
}

variable "name" {
  type    = string
  default = "my-cluster"
}
</code>

In the example above, we have created a module that creates an ECS cluster using the AWS provider. We have defined two variables (region and name) that can be customized when the module is used. The module consists of one resource (aws_ecs_cluster) that creates an ECS cluster with the specified name.

Using Terraform Modules

Using a Terraform module in an AWS infrastructure as code project involves the following steps:

Declare the module: In your main Terraform configuration file, you need to declare the module and provide its source location. You can declare the module using the module block and specify the source location using the source attribute.

<code language="terraform" name="main.tf">
provider "aws" {
  region = "us-west-2"
}

module "ecs-cluster" {
  source = "./module/ec2-cluster"
  name   = "my-cluster"
}
</code>

Customize the variables: You can customize the variables defined in the module by specifying their values in the module block.

<code language="terraform" name="main.tf">
provider "aws" {
  region = "us-west-2"
}

module "ecs-cluster" {
  source = "./module/ec2-cluster"
  name   = "my-cluster"
  region = "us-east-1"
}
</code>

Use the module resources: Once the module has been declared and customized, you can use its resources in your main configuration file by referencing them using their output values.

<code language="terraform" name="main.tf">
provider "aws" {
  region = "us-west-2"
}

module "ecs-cluster" {
  source = "./module/ec2-cluster"
  name   = "my-cluster"
  region = "us-east-
}
</code>
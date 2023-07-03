

# configure a new store for tf state 

terraform {
  backend "s3" {
    bucket         = "tf-state-ticketsense"
    key            = "terraform/ticketsense-bg-workers/terraform.tfstate"
    region         = "ap-south-1"
    dynamodb_table = "tf-state-ticketsense-lock"
    encrypt        = true

  }
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "5.5.0"
    }
    archive = {
      source  = "hashicorp/archive"
      version = "2.4.0"
    }
  }

  required_version = "~> 1.5.1"
}

# Configure the AWS Provider
provider "aws" {
  region = "ap-south-1"
}

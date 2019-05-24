---
title: "Installing Kubernetes Using kubeadm"
date: 2017-03-20T10:12:00-04:00
tags: [CS, kubernetes, devops]
---


The deployment of Kubernetes has become a little easier using the kubeadm tool.
The tools are still in alpha and [the guide](https://kubernetes.io/docs/getting-started-guides/kubeadm) is still not as thorough as I would have hoped.


# Installing Flannel as a Pod Network

Once you've completed the first two steps, you should have a working master node.
To add additional child nodes you must install a pod network.
I chose to install Flannel but there are other options available.
Make sure that CNI is installed and the directories `/opt/cni` and `/etc/cni/` exist.

To install Flannel, run the following command:

```bash
  kubectl apply -f https://raw.githubusercontent.com/coreos/flannel/master/Documentation/kube-flannel.yml
```

After the image has been deployed, the kubedns "ContainerCreating" status should be resolved.
You should have the following listing:

```bash
  default       kube-flannel-ds-dhqh7                   2/2       Running   0          19h
  kube-system   dummy-2088944543-r1sgp                  1/1       Running   0          19h
  kube-system   etcd-fooxert-prd                        1/1       Running   0          19h
  kube-system   kube-apiserver-fooxert-prd              1/1       Running   0          19h
  kube-system   kube-controller-manager-fooxert-prd     1/1       Running   0          19h
  kube-system   kube-discovery-1769846148-5xt3v         1/1       Running   0          19h
  kube-system   kube-dns-2924299975-31vzt               4/4       Running   0          19h
  kube-system   kube-proxy-ndgfh                        1/1       Running   0          19h
  kube-system   kube-scheduler-fooxert-prd              1/1       Running   0          19h
```

# Adding Child Nodes

To add child nodes to your cluster, run the join command that was output by the `kubeadm init` command.

```bash
  kubeadm join --token <token> <master-ip>
```

If you get any preflight check failures, check that the Kubernetes tools and docker were installed correctly.
In my case, I was using Ubuntu 15.10 and docker-engine was not installed correctly, even though I followed the installation instructions.

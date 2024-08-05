# listado de microservicios y puerto disponibles
gateway-scv: 8000
auth-svc: 8010
order-svc: 8020
payment-scv: 8030
delivery: 8040
store-scv: 8050

# integrando ingress
Con ingres tenemos salida por el puerto 80

# listado de base de datos, colas y puertos disponibles

mongo-scv: 27017 salida por puerto: 30300
rabbitmq: 5672 salida por puerto: 30100
rabbitmq-manager: 15672  salida por puerto: 30200

# desplegando los servicios

```sh
kubectl apply -f mongo.yaml
kubectl apply -f rabbitmq.yaml
kubectl apply -f auth-scv.yaml
kubectl apply -f gateway.yaml
kubectl apply -f order-scv.yaml
kubectl apply -f payment-scv.yaml
kubectl apply -f deliver-scv.yaml
kubectl apply -f store-scv.yaml
kubectl apply -f ingress.yaml

# verifiquemos
kubectl get svc
kubectl get po
kubectl get ing
```